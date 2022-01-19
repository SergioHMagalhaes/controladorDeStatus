const Config = require("../data/Config")
const Machine = require("../data/Machine")


function teste() {
    setTimeout(() => {
        return{
            msg: 'entrou no setT'
        }
    },10000)
}

function getTime() {
    return Config.findAll({raw: true, attributes: ['time']})
}


async function simulator() {

        try{
            
            console.log('entrou no try')
                let timeConfig = await getTime()
                console.log(timeConfig[0].time)

            const generatorRandom = (number) =>{
                return Math.floor(Math.random() * number)
            }
            
            
            async function generator ()  {
                timeConfig = await getTime()
                console.log('atual é: '+timeConfig[0].time)


                Machine.findAll({raw: true, attributes: ['id']})
                    .then((machine) => {
                            Machine.update({status: generatorRandom(2)}, {
                                where: {
                                    id: 1
                                }
                            })
                            console.log('Ok')
                })
                setTimeout(generator ,timeConfig[0].time)
            }

            setTimeout(generator() ,timeConfig[0].time)
            
        }

        catch(erro){
            console.log('Deu ruim' + erro)
        }

    }

module.exports = simulator