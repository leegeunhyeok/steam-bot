<template>
  <div id="modal-area" @click="$emit('close')">
    <div id="modal">
      <div class="modal-content">
        <h3>도움말</h3>
        <p>아래 리스트는 제가 할 수 있는 일이에요!</p><br>
        <b>- 스팀 상점 검색</b><br>
        <b>- 검색한 항목의 상세정보 조회</b><br>
        <b>- 검색한 항목의 DLC 조회</b><br>
        <b>- 카트에 추가 / 삭제</b><br>
        <b>- 카트 목록 보기</b><br>
        <b>- 카트 목록 초기화</b><br>
        <b>- 도움말</b><br>
        <p>아직 배우고있는 단계라 대화를 잘 이해하지 못할 수 있습니다 ㅜㅜ</p>
      </div>
      <div class="modal-footer">
        <button class="modal-button" @click="$emit('close')">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatModal'
}
</script>

<style lang="scss">
#modal-area {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  background-color: rgba(0, 0, 0, 0.8);

  #modal {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 3px;
    background: -webkit-linear-gradient( 135deg, #356480 5%,#1a303d 95%);
    background: linear-gradient( 135deg, #356480 5%,#1a303d 95%);
    width: 80%;
    margin: auto;

    .modal-content {
      color: #c6d4df;
      padding: 10px;
      box-sizing: border-box;
      font-size: 1rem;
      word-wrap: break-word;
    }

    .modal-footer {

      .modal-button {
        border-radius: 2px;
        border: none;
        padding: 4px 8px;
        display: inline-block;
        cursor: pointer;
        text-decoration: none;
        color: #67c1f5;
        background: rgba( 103, 193, 245, 0.2 );
      }

      .modal-button:hover {
        text-decoration: none;
        color: #fff;
        background: #417a9b;
        background: -webkit-linear-gradient(-60deg, #417a9b 5%,#67c1f5 95%);
        background: linear-gradient(-60deg, #417a9b 5%,#67c1f5 95%);
      }

    }
  }
}
</style>
