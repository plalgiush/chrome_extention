const grabBtn = document.getElementById("grabBtn");
const promise = indexedDB.databases();
promise.then((databases) => console.log(databases));
grabBtn.addEventListener("click",() => {    
    alert(window.indexedDB.FilesDB);
    // console.log(localStorage.getItem('file'))
    console.log(412341234)
})

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import Button from '../components/Button/Button';
// console.log(document.getElementById('extention'))

// ReactDOM.createRoot(document.getElementById('extention')).render(
//   <React.StrictMode>
//     <Button />
//   </React.StrictMode>,
// )
