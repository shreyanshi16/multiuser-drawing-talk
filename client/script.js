let socket, sendMessageBoard;
$(() => {
  socket = io.connect("http://localhost:8000");
  var sendMessageBoard = new DrawingBoard.Board('sendMessageBoard', {
    background: "#ff7ffe",
  	color: "#fff",
  	size: 30,
  	controls: [
  		{ Size: { type: "range" } },
  		{ Navigation: { back: false, forward: false } },
  		'DrawingMode'
  	],
  	webStorage: 'local'
});
  $("#sendDWGbtn").click(() => {
  
    socket.emit("drawing", sendMessageBoard.getImg());

    sendMessageBoard.resetBackground();
    return false;
  });
  socket.on("drawing", function (msg) {
    $("#messageContainer").append(
      $("<li class='w-100 d-flex align-center justify-content-center'>").html(
        `<img src="${msg}" class="w-75 m-auto img-msg"/>`
      )
    );
    window.scrollTo(0, document.body.scrollHeight);
  });
});
