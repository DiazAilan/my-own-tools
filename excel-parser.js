const data = require('./data/SUCURSAL_CANAL.json');


console.log(data.filter(item => item.COUNTRY_CANALES === 'Argentina' && item.CANAL === 'Franquicias').map(item => item.SURURSAL));