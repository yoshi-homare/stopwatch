'use strict';

{
  // それぞれのIDを取得。
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");

  // 変数を設定。
  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  // 経過ミリ秒を取得し各分、秒、ミリ秒を取得しtimerIDに挿入。
  // 10ミリ秒ごとに表示を繰り返す。
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    timer.textContent = `${m}:${s}:${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // スタート状態にinactiveクラスを設定。
  function setButtonStateInitial() {
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.add("inactive");
  }

  // 作動状態にinactiveクラスを設定。
  function setButtonStateRunning() {
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.add("inactive");
  }

  // ストップ状態にinactiveクラスを設定。
  function setButtonStateStopped() {
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.remove("inactive");
  }

  // スタート状態のクラスを挿入。
  setButtonStateInitial();

  // startIDにクリックイベントを付与しinactiveクラスのtrueのものをクリックできないよう設定しスタート状態のクラスをクリック可に設定し作動状態のクラスを挿入しカウント開始を挿入。
  start.addEventListener("click", () => {
    if (start.classList.contains("inactive") === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  // stopIDにクリックイベントを付与しinactiveクラスのtrueのものをクリックできないよう設定しストップ状態のクラスを挿入しタイマーを止めたところからスタートできるよう設定。
  stop.addEventListener("click", () => {
    if (stop.classList.contains("inactive") === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });

  // resetIDにクリックイベントを付与しinactiveクラスのtrueのものをクリックできないよう設定しスタート状態のクラスを挿入しタイマーをリセットするよう設定。
  reset.addEventListener("click", () => {
    if (reset.classList.contains("inactive") === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = "00:00:000";
    elapsedTime = 0;
  });
}