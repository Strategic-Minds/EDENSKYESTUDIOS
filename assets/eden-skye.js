(function(){
  var payload=[];
  document.querySelectorAll('[data-xyla-section],[data-xyla-card],[data-xyla-page],[data-xyla-model],[data-xyla-image-key]').forEach(function(node){
    payload.push({section:node.dataset.xylaSection||null,card:node.dataset.xylaCard||null,page:node.dataset.xylaPage||null,model:node.dataset.xylaModel||null,imageKey:node.dataset.xylaImageKey||null,text:(node.innerText||'').replace(/\s+/g,' ').trim().slice(0,900),href:node.href||null});
  });
  document.querySelectorAll('[data-eden-scroll]').forEach(function(button){
    button.addEventListener('click',function(){
      var row=document.querySelector('[data-eden-carousel]');
      if(!row)return;
      var dir=button.getAttribute('data-eden-scroll')==='left'?-1:1;
      row.scrollBy({left:dir*Math.max(280,row.clientWidth*.72),behavior:'smooth'});
    });
  });
  window.EDEN_XYLA_CONTENT=payload;
  window.EDEN_XYLA_READY=true;
  document.documentElement.dataset.xylaReady='true';
})();
