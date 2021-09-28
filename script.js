document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); // prevenir que o formulário seja enviado ao clicar na tecka ENTER

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){ // Validação de formulario, não enviar em branco
        clearInfor();
        aviso('Carregando....');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=eda0aba43fe98bdb080fd251d785e781&units=metric&lang=pt_br`

        let result = await fetch(url);
        let json = await result.json();

        if(json.cod === 200){
            informacao({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfor();
            aviso('Não encontramos essa localização.')
        }
    }
})

function informacao(json){
    aviso('');
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
}
function clearInfor(){
    aviso('')
    document.querySelector('.resultado').style.display = 'nome';
}

function aviso(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

