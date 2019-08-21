import React, {createRef, PureComponent} from 'react';
import uniqueId from 'lodash/uniqueId'
import './ClrUpload.scss'

interface OwnProps {
  maximum: number;
}

type Props = OwnProps;

type State = Readonly<{
  tasks: IUploadTask[];
}>;

function getXhr() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts/');
  return xhr;
}

export enum EUploadState {
  uploading,
  error,
  saving,
  complete,
}
const TUploadStateText: {[s: number]: string} = {
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
  };
  file = createRef<HTMLInputElement>();
  xhrMap: { [s: string]: XMLHttpRequest } = {};

  handleClick() {
    this.file.current!.click();
  }

  handleFileChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files!.length > 0) {
      this.handleCreateItem(files![0]);
      this.file.current!.value = '';
    }
  }

  handleCreateItem(file: File) {
    const id = uniqueId('clr-');
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          file: file,
          state: EUploadState.uploading,
          percentage: 0,
          __uniqueId: id,
        },
      ]
    });
   this._makeRequest(id, file);
  }
  _makeRequest(id: string, file: File) {
    const xhr = getXhr();
    const fd = new FormData();
    fd.append('file', file);
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
        });
      } else {
        this._setTaskDetailWithId(id, task => {
          task.state = EUploadState.error;
          task.percentage = 0;
        });
      }
    };
    this._setTaskDetailWithId(id, task => {
      task.state = EUploadState.uploading;
      task.percentage = 0;
    });
    this.xhrMap[id] = xhr;
    xhr.send(fd);
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
                <div>
                  {buttons}
                </div>
              </div>
            </li>
          );
        })}
        {this.props.maximum === 0 || this.state.tasks.length < this.props.maximum ? (
          <li>
            <div>
              <input onChange={(e) => this.handleFileChanged(e)} ref={this.file} type="file" hidden/>
              <div onClick={() => this.handleClick()} className="action">+</div>
            </div>
          </li>
        ): null}
      </ul>
    );
  }
}

export default ClrUpload;

export interface IUploadTask {
  file?: File;
  url?: string;
  percentage?: number;
  state: EUploadState;
  __uniqueId: string;
}

