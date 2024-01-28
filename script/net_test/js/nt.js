// @timestamp thenkey 2024-01-28 00:32:34
try {
  const getEnv = () => {
    return "undefined" != typeof $environment && $environment["surge-version"]
      ? "Surge"
      : "undefined" != typeof $environment && $environment["stash-version"]
      ? "Stash"
      : "undefined" != typeof module && module.exports
      ? "Node.js"
      : "undefined" != typeof $task
      ? "Quantumult X"
      : "undefined" != typeof $loon
      ? "Loon"
      : "undefined" != typeof $rocket
      ? "Shadowrocket"
      : void 0;
  };
  console.log(getEnv());
  let ios = getEnv()
  if (ios == "Loon") {
    const s = $loon.split(" ");
    ios = {
      device: s[0],
      ios: s[1],
      version: s[2],
      app: "Loon",
    };
  } else if (ios == "Surge") {
    ios = $environment
    ios['app'] = "Surge"
  }

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };
  
  if (getEnv() == "Quantumult X") {
    const s = $environment.version.split(" ");
    ios = {
      device: s[0],
      ios: s[1],
      version: s[2],
      app: "Quantumult X",
    };
    $done({
      status: "HTTP/1.1 200 OK",
      headers: headers,
      body: JSON.stringify(
        {
          设备: ios,
          长度: $.length,
          耗时: Date.now() - q + "ms",
        },
        null,
        3
      ),
    });
  } else {
    $done({
      response: {
        status: 200,
        headers: headers,
        body: JSON.stringify(
          {
            设备: ios,
            长度: $.length,
            耗时: Date.now() - q + "ms",
          },
          null,
          3
        ),
      },
    });
  }
  
}catch(e){}})();