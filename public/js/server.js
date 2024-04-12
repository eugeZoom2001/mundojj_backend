const S_CargarServer = (url, method, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: method,
      url: url,
      crossOrigin: true,
      data: data,
      //dataType: dataType,
      dataType: "json",
      success: resolve,
      error: reject,
    });
  });
};