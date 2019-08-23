import React, {createRef, PureComponent} from 'react';
import uniqueId from 'lodash/uniqueId'
import './ClrUpload.scss'

interface OwnProps {
  value?: any[],
  limit?: number;
  accept?: string;
  name?: string;
  multiple?: boolean;
  withCredentials?: boolean,
  data?: { [s: string]: any },
  headers?: { [s: string]: string },
  action: string;
  onChange?: (s: { target: { name: string, value: any } }) => void
}

type Props = OwnProps;

type State = Readonly<{
  tasks: IUploadTask[];
}>;


export enum EUploadState {
  waiting,
  uploading,
  error,
  saving,
  complete,
}

const TUploadStateText: { [s: number]: string } = {
  [EUploadState.waiting]: '等待中',
  [EUploadState.uploading]: '上传中',
  [EUploadState.error]: '上传出错',
  [EUploadState.saving]: '保存中',
  [EUploadState.complete]: '上传成功',
};

class ClrUpload extends PureComponent<Props, State> {
  readonly state: State = {
    tasks: []
  };
  static defaultProps = {
    maximum: 0,
    accept: '*/*',
    data: {},
    headers: {},
    name: 'file',
    multiple: false,
    withCredentials: false,
  };
  file = createRef<HTMLInputElement>();
  xhrMap: { [s: string]: XMLHttpRequest } = {};

  setStateAsync<K extends keyof Readonly<{ tasks: IUploadTask[] }>>(state: ((prevState: Readonly<Readonly<{ tasks: IUploadTask[] }>>, props: Readonly<OwnProps>) => (Pick<Readonly<{ tasks: IUploadTask[] }>, K> | Readonly<{ tasks: IUploadTask[] }> | null)) | Pick<Readonly<{ tasks: IUploadTask[] }>, K> | Readonly<{ tasks: IUploadTask[] }> | null): Promise<void> {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  handleClick() {
    this.file.current!.click();
  }

  async handleFileChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files!.length > 0) {
      // @ts-ignore
      for (let file of files!) {
        await this.handleCreateItem(file);
      }

      if (this.file.current) {
        this.file.current.value = '';
      }
    }
  }

  async handleCreateItem(file: File) {
    const id = uniqueId('clr-');
    const tasks = [...this.state.tasks];
    tasks.push({
      file: file,
      state: EUploadState.uploading,
      percentage: 0,
      __uniqueId: id,
    });
    await this.setStateAsync({
      tasks,
    });
    this._makeRequest(id, file);

  }

  _makeRequest(id: string, file: File) {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    fd.append(this.props.name!, file);
    Object.keys(this.props.data!).forEach(key => {
      fd.append(key, this.props.data![key]);
    });
    xhr.open('POST', this.props.action);
    Object.keys(this.props.headers!).forEach(key => {
      xhr.setRequestHeader(key, this.props.headers![key]);
    });
    xhr.withCredentials = this.props.withCredentials!;
    xhr.upload.onprogress = e => {
      const isUploadComplete = e.loaded === e.total;
      this._setTaskDetailWithId(id, task => {
        task.state = isUploadComplete ? EUploadState.saving : EUploadState.uploading;
        task.percentage = +((e.loaded / e.total * 100).toFixed(2));
      });
    };
    xhr.onerror = xhr.ontimeout = () => {
      this._setTaskDetailWithId(id, task => {
        task.state = EUploadState.error;
        task.percentage = 0;
      });
    };
    xhr.onabort = () => {
      delete this.xhrMap[id];
      this.handleDeleteTask(id);
    };
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        delete this.xhrMap[id];
        this._setTaskDetailWithId(id, task => {
          task.state = EUploadState.complete;
          task.percentage = 100;
          task.response = xhr.response;
        });
        this._emitOnChange();
      } else {
        this._setTaskDetailWithId(id, task => {
          task.state = EUploadState.error;
          task.percentage = 0;
        });
      }
    };
    this._setTaskDetailWithId(id, task => {
      task.state = EUploadState.waiting;
      task.percentage = 0;
    });
    this.xhrMap[id] = xhr;
    xhr.send(fd);
  }

  _getResponse(response: string) {
    try {
      return JSON.parse(response);
    } catch (e) {
      return response;
    }
  }

  _emitOnChange() {
    setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name: this.props.name!,
            value: this.state.tasks.filter(item => item.response).map(item => this._getResponse(item.response))
          }
        });
      }
    }, 0);
  }

  _setTaskDetailWithId(id: string, fn: (task: IUploadTask) => void) {
    const index = this.state.tasks.findIndex(task => task.__uniqueId === id);
    if (index !== -1) {
      const tasks = [...this.state.tasks];
      fn(tasks[index]);
      this.setState({
        tasks
      });
    }
  }

  // 预览
  handlePreview(task: IUploadTask) {
    console.log(task);
  }

  // 删除
  handleDeleteTask(id: string) {
    const index = this.state.tasks.findIndex(task => task.__uniqueId === id);
    if (index !== -1) {
      const tasks = [...this.state.tasks];
      tasks.splice(index, 1);
      this.setState({
        tasks
      });
    }
    this._emitOnChange();
  }

  // 取消
  handleCancel(id: string) {
    const xhr = this.xhrMap[id];
    if (xhr) {
      xhr.abort();
    }
  }

  handleRetry(row: IUploadTask) {
    const xhr = this.xhrMap[row.__uniqueId];
    if (xhr) {
      this._makeRequest(row.__uniqueId, row.file!);
    }
  }

  render() {

    return (
      <ul className="clr-upload-wrapper">
        {this.state.tasks.map(task => {
          const previewButton = <button onClick={() => this.handlePreview(task)} type="button"
                                        key="preview">预览</button>;
          const cancelButton = <button onClick={() => this.handleCancel(task.__uniqueId)} type="button"
                                       key="cancel">取消</button>;
          const deleteButton = <button onClick={() => this.handleDeleteTask(task.__uniqueId)} type="button"
                                       key="delete">删除</button>;
          const retryButton = <button onClick={() => this.handleRetry(task)} type="button" key="retry">重试</button>;
          const buttons = [previewButton];
          if (task.state === EUploadState.uploading) {
            buttons.push(cancelButton);
          } else if (task.state === EUploadState.error) {
            buttons.push(retryButton);
          } else if (task.state === EUploadState.complete) {
            buttons.push(deleteButton);
          }
          return (
            <li key={task.__uniqueId}>
              <div>

              </div>
              <div className="action-mask">
                <span className="state-text">
                  {TUploadStateText[task.state]}
                  {task.state === EUploadState.uploading ? `(${task.percentage}%)` : null}
                </span>
                <div style={{height: '10px'}}/>
                <div>
                  {buttons}
                </div>
              </div>
            </li>
          );
        })}
        {this.props.limit === 0 || this.state.tasks.length < this.props.limit! ? (
          <li>
            <div>
              <input multiple={this.props.multiple!} accept={this.props.accept}
                     onChange={(e) => this.handleFileChanged(e)} ref={this.file} type="file" hidden/>
              <div onClick={() => this.handleClick()} className="action">+</div>
            </div>
          </li>
        ) : null}
      </ul>
    );
  }
}

export default ClrUpload;

export interface IUploadTask {
  file?: File;
  url?: string;
  percentage?: number;
  response?: any;
  state: EUploadState;
  __uniqueId: string;
}
