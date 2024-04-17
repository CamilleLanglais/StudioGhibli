const getGhibliData = async function() {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    if (response.status === 200) {
        return await response.json();
    } else {
        new Error(response.statusText);
    }
}
export { getGhibliData }