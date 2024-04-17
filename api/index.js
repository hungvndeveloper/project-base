let promise1 = new Promise((rs, rj) => setTimeout(() => rs(100), 3000));
let promise2 = new Promise((rs, rj) => setTimeout(() => rs(200), 2000));
// promise1.then((data) => {
//     console.log("promise1::", data);
// });
// promise2.then((data) => {
//     console.log("promise2::", data);
// });
async function showData() {
    console.log("promise1::", await promise1);
    console.log("promise2::",  await promise2);
    console.log("line 3");
}
showData();
console.log("line 0");
