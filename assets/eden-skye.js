(function(){
  var payload=[];
  document.querySelectorAll('[data-xyla-section],[data-xyla-card],[data-xyla-page]').forEach(function(node){
    payload.push({section:node.dataset.xylaSection||null,card:node.dataset.xylaCard||null,page:node.dataset.xylaPage||null,text:(node.innerText||'').replace(/\s+/g,' ').trim().slice(0,900),href:node.href||null});
  });
  window.EDEN_XYLA_CONTENT=payload;
  window.EDEN_XYLA_READY=true;
  document.documentElement.dataset.xylaReady='true';
})();
