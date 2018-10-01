document.addEventListener('DOMContentLoaded', (event) => {
   sw();
});

/**
 * Setup Service Worker
 */
sw = () => {
   if (!navigator.serviceWorker) return;
   console.log('Service Worker: Supported');
   navigator.serviceWorker.register('../sw.js').then(function(reg){
      console.log('Service Worker: Registered')
   }).catch(function(error) {
      console.log(`Service Worker: Error ${error}`);
   });
}