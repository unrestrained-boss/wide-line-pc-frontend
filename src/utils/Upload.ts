import uniqueId from 'lodash/uniqueId';
function _getResponse(response: string) {
  try {
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
}
export function uploadCustomRequest(options: { [s: string]: any }) {
  const {action, data, headers, onProgress, onError, onSuccess, withCredentials, file, filename} = options;
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  fd.append(filename, file);
  Object.keys(data).forEach(key => {
    fd.append(key, data[key]);
  });
  xhr.open('POST', action);
  Object.keys(headers).forEach(key => {
    xhr.setRequestHeader(key, headers[key]);
  });
  xhr.withCredentials = withCredentials;
  xhr.upload.onprogress = e => {
    onProgress({percent: e.loaded / e.total * 100})
  };
  xhr.onerror = xhr.ontimeout = () => {
    onError(xhr.response);
  };
  xhr.onabort = () => {
  };
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      const response = _getResponse(xhr.response);
      if (response.code === 200) {
        onSuccess(response.data)
      } else {
        onError(response.msg || response);
      }
    } else {
      onError(xhr.response);
    }
  };
  xhr.send(fd);
  return {
    abort() {
      xhr.abort();
    }
  };
}
export function uploadGetValueFromEvent(e: any) {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}
export function uploadResultSerialization(fileEvents: any[], host = ''): string[] {
  return fileEvents.map(item => {
    return item.response ? (item.response as string[])[0] : item.url.replace(new RegExp(`^${host}`), '');
  });
}
export function uploadPreData(data: string[]) {
  return data.map(item => {
    return {
      uid: uniqueId('_upload_'),
      name: uniqueId('_upload_name_'),
      status: 'done',
      url: item,
    };
  });
}
