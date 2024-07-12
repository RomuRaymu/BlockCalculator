$(function () {
  $("#make_num").click(function () {
    let rand_num = Math.floor(Math.random() * 10);
    let randBlock = $(`<div class='img_block' value='${rand_num}'><span class='nums'>${rand_num}</span></div>`);
    randBlock
      .css("left", Math.random() * 500)
      .css("top", Math.random() * 500)
      .on("mousedown", mouseDownEvent)
      .on("mouseup", mouseUpEvent);
    $("body").append(randBlock);
  });
  
  $("#make_oper").click(function () {
    let opers = ["+", "-", "*", "/"];
    let rand_oper = opers[Math.floor(Math.random() * 4)];
    let operBlock = $(`<div class='img_block' value='${rand_oper}'><span class='nums'>${rand_oper}</span></div>`);
    operBlock
        .css("left", Math.random() * 500)
        .css("top", Math.random() * 500)
        .on("mousedown", mouseDownEvent)
        .on("mouseup", mouseUpEvent);
    $("body").append(operBlock);
  });
  
  $("#calc").click(function () {
    let equalBlock = $(`<div class='img_block' value='='><span class='nums'>=</span></div>`);
    equalBlock
            .css("left", Math.random() * 500)
            .css("top", Math.random() * 500)
            .on("mousedown", mouseDownEvent)
            .on("mouseup", mouseUpEvent);
        $("body").append(equalBlock);
  });
});

function collapseCheck(mainImg, subImg) {
  let mainImg_left = parseInt(mainImg.css("left"));
  let mainImg_top = parseInt(mainImg.css("top"));
  let mainImg_right = mainImg_left + parseInt(mainImg.css("width"));
  let mainImg_bottom = mainImg_top + parseInt(mainImg.css("height"));

  let subImg_left = parseInt(subImg.css("left"));
  let subImg_top = parseInt(subImg.css("top"));
  let subImg_right = subImg_left + parseInt(subImg.css("width"));
  let subImg_bottom = subImg_top + parseInt(subImg.css("height"));

  if (mainImg_left < subImg_right && mainImg_right > subImg_left && mainImg_top < subImg_bottom && mainImg_bottom > subImg_top) {
    if (mainImg_left + parseInt(mainImg.css("width")) / 2 > subImg_left + parseInt(subImg.css("width")) / 2) {
      return "right";
    } else return "left";
  }
}

function makeImgBlock(left, right) {
  let value = (() => {
    if(left.attr("value") == "=" || right.attr("value") == "=") {
      if(left.attr("value") != "=") return calc(left.attr("value"));
      else return calc(right.attr("value"));
    }
    else {
      return left.attr("value") + right.attr("value");
    }
  })();
  
  let tt = `<div class='img_block' value='${value}'>`;
  let valueArr = value.toString().split("");
  for(let i = 0; i < valueArr.length; i++) {
    tt += `<span class='nums'>${valueArr[i]}</span>`;
  }
  tt += `</div>`;

  let newBlock = $(tt);
  newBlock
    .css("left", left.css("left"))
    .css("top", left.css("top"))
    .css("width", left.css("width") + right.css("width"))
    .css("height", left.css("height"))
    .on("mousedown", mouseDownEvent)
    .on("mouseup", mouseUpEvent);
  $("body").append(newBlock);
  left.remove();
  right.remove();
}

function mouseDownEvent() {
  $(".img_block").each(function () {
    $(this).css("z-index", 0);
  });

  $(this).on("mousemove", function (e) {
    $(this)
      .css("left", e.clientX - $(this).width() / 2 > 0 ? e.clientX - $(this).width() / 2 : 0)
      .css("top", e.clientY - $(this).height() / 2 > 0 ? e.clientY - $(this).height() / 2 : 0)
      .css("z-index", 1);
  });
}

function mouseUpEvent() {
  $(this).css("z-index", 1);

  $(this).off("mousemove");

  let mainImg = $(this);
  $(".img_block")
    .not(this)
    .each(function () {
      var subImg = $(this);
      switch (collapseCheck(mainImg, subImg)) {
        case "right":
          makeImgBlock(subImg, mainImg);
          break;
        case "left":
          makeImgBlock(mainImg, subImg);
          break;
        default:
          break;
      }
    });
}

function calc(expr) {
    if(isNaN(expr)) {
      // let arr = expr.split(/(?<=[-+*/])|(?=[-+*/])/);
      // let numbers = [];
      // let opers = [];

      // for(let i = 0; i < arr.length; i++) {

      // }
        return math.evaluate(expr);
      // return "hello";
    }
    else return expr;
}
