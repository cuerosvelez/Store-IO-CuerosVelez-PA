/* ___ modal zip code ___ */
/*let resultTransform = fletes.split('
').map(function (item) {
	let values = item.split(';');
	return {
		zipCode: Number(values[0]),
		distrito: values[1],
		Provincia: values[2]
	};
});*/
const addSizeItems = () => {
  const item = $('.CartQuantity-quantity')
  const value = `${vtexjs.checkout.orderForm.items.length ?? ''}`
  if (item.html() !== value) item.html(value)
}

const resultTransform = [
  { zipCode: 1007, distrito: 'ALMIRANTE', Provincia: 'ALMIRANTE' },
  { zipCode: 1006, distrito: 'CHANGUINOLA', Provincia: 'CHANGUINOLA' },
  { zipCode: 1013, distrito: 'CHIRIQUI GRANDE', Provincia: 'CHIRIQUI GRANDE' },
  { zipCode: 4029, distrito: 'ALANJE', Provincia: 'ALANJE' },
  { zipCode: 4016, distrito: 'BUGABA', Provincia: 'LA CONCEPCION' },
  { zipCode: 4001, distrito: 'DAVID', Provincia: 'DAVID' },
  { zipCode: 4067, distrito: 'GUALACA', Provincia: 'GUALACA' },
  { zipCode: 4068, distrito: 'GUALACA', Provincia: 'HORNITO' },
  { zipCode: 4071, distrito: 'GUALACA', Provincia: 'RINCON' },
  { zipCode: 4073, distrito: 'REMEDIOS', Provincia: 'EL NANCITO' },
  { zipCode: 4072, distrito: 'REMEDIOS', Provincia: 'REMEDIOS' },
  { zipCode: 4091, distrito: 'SAN FELIX', Provincia: 'LAS LAJAS' },
  { zipCode: 4094, distrito: 'SAN FELIX', Provincia: 'LAJAS ADENTRO' },
  { zipCode: 4092, distrito: 'SAN FELIX', Provincia: 'JUAY' },
  { zipCode: 4095, distrito: 'SAN FELIX', Provincia: 'SANTA CRUZ' },
  { zipCode: 4078, distrito: 'SAN LORENZO', Provincia: 'BOCA CHICA' },
  { zipCode: 4077, distrito: 'SAN LORENZO', Provincia: 'HORCONCITOS' },
  { zipCode: 4087, distrito: 'TOLE', Provincia: 'BELLA VISTA' },
  { zipCode: 4082, distrito: 'TOLE', Provincia: 'TOLE' },
  { zipCode: 4090, distrito: 'TOLE', Provincia: 'VELADERO' },
  { zipCode: 2038, distrito: 'AGUADULCE', Provincia: 'AGUADULCE' },
  { zipCode: 2039, distrito: 'AGUADULCE', Provincia: 'EL CRISOL' },
  { zipCode: 2001, distrito: 'ANTON', Provincia: 'ANTON' },
  { zipCode: 2008, distrito: 'ANTON', Provincia: 'SAN JUAN DE DIOS' },
  { zipCode: 2009, distrito: 'ANTON', Provincia: 'SANTA RITA' },
  { zipCode: 2034, distrito: 'OLA', Provincia: 'EL COPE' },
  { zipCode: 2033, distrito: 'OLA', Provincia: 'OLA' },
  { zipCode: 2012, distrito: 'PENONOME', Provincia: 'CANAVERAL' },
  { zipCode: 2014, distrito: 'PENONOME', Provincia: 'CHIGUIRI ARRIBA' },
  { zipCode: 2015, distrito: 'PENONOME', Provincia: 'EL COCO' },
  { zipCode: 2016, distrito: 'PENONOME', Provincia: 'PAJONAL' },
  { zipCode: 2011, distrito: 'PENONOME', Provincia: 'PENONOME' },
  { zipCode: 2017, distrito: 'PENONOME', Provincia: 'RIO GRANDE' },
  { zipCode: 12026, distrito: 'PINOGANA', Provincia: 'METETI' },
  { zipCode: 12025, distrito: 'PINOGANA', Provincia: 'YAVIZA' },
  { zipCode: 5001, distrito: 'CHITRE', Provincia: 'CHITRE' },
  { zipCode: 5002, distrito: 'CHITRE', Provincia: 'LA ARENA' },
  { zipCode: 5005, distrito: 'CHITRE', Provincia: 'LLANO BONITO' },
  { zipCode: 5004, distrito: 'CHITRE', Provincia: 'SAN JUAN BAUTISTA' },
  { zipCode: 5003, distrito: 'CHITRE', Provincia: 'MONAGRILLO' },
  { zipCode: 5019, distrito: 'PARITA', Provincia: 'PARIS' },
  { zipCode: 5015, distrito: 'PARITA', Provincia: 'PARITA' },
  { zipCode: 5025, distrito: 'PESE', Provincia: 'EL BARRERO' },
  { zipCode: 5026, distrito: 'PESE', Provincia: 'EL PEDREGOSO' },
  { zipCode: 5024, distrito: 'PESE', Provincia: 'EL PAJARO' },
  { zipCode: 5023, distrito: 'PESE', Provincia: 'LAS CABRAS' },
  { zipCode: 5022, distrito: 'PESE', Provincia: 'PESE' },
  { zipCode: 6055, distrito: 'MACARACAS', Provincia: 'BAHIA HONDA' },
  { zipCode: 6056, distrito: 'MACARACAS', Provincia: 'BAJOS DE GUERA' },
  { zipCode: 6058, distrito: 'MACARACAS', Provincia: 'CHUPA' },
  { zipCode: 6062, distrito: 'MACARACAS', Provincia: 'LAS PALMAS' },
  { zipCode: 6063, distrito: 'MACARACAS', Provincia: 'LLANO DE PIEDRAS' },
  { zipCode: 6054, distrito: 'MACARACAS', Provincia: 'MACARACAS' },
  { zipCode: 6066, distrito: 'PEDASI', Provincia: 'LOS ASIENTOS' },
  { zipCode: 6067, distrito: 'PEDASI', Provincia: 'MARIARE' },
  { zipCode: 6065, distrito: 'PEDASI', Provincia: 'PEDASI' },
  { zipCode: 6068, distrito: 'PEDASI', Provincia: 'PURIO' },
  { zipCode: 7064, distrito: 'LA CHORRERA', Provincia: 'BARRIO BALBOA' },
  { zipCode: 7069, distrito: 'LA CHORRERA', Provincia: 'EL COCO' },
  { zipCode: 7079, distrito: 'LA CHORRERA', Provincia: 'PLAYA LEONA' },
  { zipCode: 8054, distrito: 'ATALAYA', Provincia: 'ATALAYA' },
  { zipCode: 8055, distrito: 'ATALAYA', Provincia: 'EL BARRITO' },
  { zipCode: 8057, distrito: 'ATALAYA', Provincia: 'SAN ANTONIO' },
  { zipCode: 8072, distrito: 'MARIATO', Provincia: 'MARIATO' },
  { zipCode: 8075, distrito: 'MARIATO', Provincia: 'TEBARIO' },
  { zipCode: 8059, distrito: 'MONTIJO', Provincia: 'MONTIJO' },
  { zipCode: 8063, distrito: 'MONTIJO', Provincia: 'PILON' },
  { zipCode: 8042, distrito: 'SAN FRANCISCO', Provincia: 'CORRAL FALSO' },
  { zipCode: 8041, distrito: 'SAN FRANCISCO', Provincia: 'SAN FRANCISCO' },
  { zipCode: 8045, distrito: 'SAN FRANCISCO', Provincia: 'SAN JUAN' },
  { zipCode: 8046, distrito: 'SAN FRANCISCO', Provincia: 'SAN JOSE' },
  { zipCode: 8051, distrito: 'SANTA FE', Provincia: 'EL PANTANO' },
  { zipCode: 8047, distrito: 'SANTA FE', Provincia: 'SANTA FE' },
  { zipCode: 8009, distrito: 'SANTIAGO', Provincia: 'CARLOS SANTANA AVILA' },
  { zipCode: 8010, distrito: 'SANTIAGO', Provincia: 'EDWIN FABREGA' },
  { zipCode: 8003, distrito: 'SANTIAGO', Provincia: 'LA PENA' },
  { zipCode: 8008, distrito: 'SANTIAGO', Provincia: 'LOS AGARROBOS' },
  { zipCode: 8001, distrito: 'SANTIAGO', Provincia: 'NUEVO SANTIAGO' },
  { zipCode: 8024, distrito: 'SONA', Provincia: 'GUARUMAL' },
  { zipCode: 8025, distrito: 'SONA', Provincia: 'LA SOLEDAD' },
  { zipCode: 8019, distrito: 'SONA', Provincia: 'SONA' },
  { zipCode: 3001, distrito: 'COLON', Provincia: 'BARRIO NORTE' },
  { zipCode: 3002, distrito: 'COLON', Provincia: 'BARRIO SUR' },
  { zipCode: 3007, distrito: 'COLON', Provincia: 'ESCOBAL' },
  { zipCode: 3014, distrito: 'COLON', Provincia: 'SANTA ROSA' },
  { zipCode: 3029, distrito: 'PORTOBELO', Provincia: 'CACIQUE' },
  { zipCode: 3030, distrito: 'PORTOBELO', Provincia: 'GARROTE' },
  { zipCode: 3028, distrito: 'PORTOBELO', Provincia: 'PORTOBELO' },
  { zipCode: 3035, distrito: 'SANTA ISABEL', Provincia: 'MIRAMAR' },
  { zipCode: 3033, distrito: 'SANTA ISABEL', Provincia: 'PALENQUE' },
  { zipCode: 3037, distrito: 'SANTA ISABEL', Provincia: 'PALMIRA' },
  { zipCode: 1004, distrito: 'ALMIRANTE', Provincia: 'CAUCHERO' },
  { zipCode: 1010, distrito: 'ALMIRANTE', Provincia: 'VALLE DE RISCO' },
  { zipCode: 1011, distrito: 'CHANGUINOLA', Provincia: 'EL EMPALME' },
  { zipCode: 1008, distrito: 'CHANGUINOLA', Provincia: 'GUABITO' },
  { zipCode: 1015, distrito: 'CHIRIQUI GRANDE', Provincia: 'MIRAMAR' },
  { zipCode: 1016, distrito: 'CHIRIQUI GRANDE', Provincia: 'PUNTA PENA' },
  { zipCode: 1017, distrito: 'CHIRIQUI GRANDE', Provincia: 'RAMBALA' },
  { zipCode: 4037, distrito: 'BOQUERON', Provincia: 'BOQUERON' },
  { zipCode: 4044, distrito: 'BOQUERON', Provincia: 'TIJERAS' },
  { zipCode: 4022, distrito: 'BUGABA', Provincia: 'SAN ANDRES' },
  { zipCode: 4025, distrito: 'BUGABA', Provincia: 'SANTO DOMINGO' },
  { zipCode: 4026, distrito: 'BUGABA', Provincia: 'SORTOVA' },
  { zipCode: 4003, distrito: 'DAVID', Provincia: 'COCHEA' },
  { zipCode: 4008, distrito: 'DAVID', Provincia: 'SAN CARLOS' },
  { zipCode: 4059, distrito: 'DOLEGA', Provincia: 'DOLEGA' },
  { zipCode: 4066, distrito: 'DOLEGA', Provincia: 'LOS ALGARROBOLS' },
  { zipCode: 4065, distrito: 'DOLEGA', Provincia: 'TINAJAS' },
  { zipCode: 1001, distrito: 'BOCAS DEL TORO', Provincia: 'BOCAS DEL TORO' },
  { zipCode: 1014, distrito: 'CHIRIQUI GRANDE', Provincia: 'PUNTA ROBALO' },
  { zipCode: 4030, distrito: 'ALANJE', Provincia: 'DIVALA' },
  { zipCode: 4035, distrito: 'ALANJE', Provincia: 'CANTA GALLO' },
  { zipCode: 4031, distrito: 'ALANJE', Provincia: 'GUARUMAL' },
  { zipCode: 4033, distrito: 'ALANJE', Provincia: 'QUEREVALO' },
  { zipCode: 4034, distrito: 'ALANJE', Provincia: 'SANTO TOMAS' },
  { zipCode: 4014, distrito: 'BARU', Provincia: 'BACO' },
  { zipCode: 4013, distrito: 'BARU', Provincia: 'PROGRESO' },
  { zipCode: 4011, distrito: 'BARU', Provincia: 'PUERTO ARMUELLES' },
  { zipCode: 4015, distrito: 'BARU', Provincia: 'RODOLFO AGUILAR DELGADO' },
  { zipCode: 4038, distrito: 'BOQUERON', Provincia: 'BAGALA' },
  { zipCode: 4043, distrito: 'BOQUERON', Provincia: 'PEDREGAL' },
  { zipCode: 4056, distrito: 'BOQUETE', Provincia: 'ALTO BOQUETE' },
  { zipCode: 4053, distrito: 'BOQUETE', Provincia: 'BAJO BOQUETE' },
  { zipCode: 4054, distrito: 'BOQUETE', Provincia: 'CALDERA' },
  { zipCode: 4057, distrito: 'BOQUETE', Provincia: 'JARAMILLO' },
  { zipCode: 4058, distrito: 'BOQUETE', Provincia: 'LOS NARANJOS' },
  { zipCode: 4055, distrito: 'BOQUETE', Provincia: 'PALMIRA' },
  { zipCode: 4017, distrito: 'BUGABA', Provincia: 'ASERRIO DE GARICHE' },
  { zipCode: 4018, distrito: 'BUGABA', Provincia: 'BUGABA' },
  { zipCode: 4028, distrito: 'BUGABA', Provincia: 'EL BONGO' },
  { zipCode: 4020, distrito: 'BUGABA', Provincia: 'GOMEZ' },
  { zipCode: 4021, distrito: 'BUGABA', Provincia: 'LA ESTRELLA' },
  { zipCode: 4023, distrito: 'BUGABA', Provincia: 'SANTA MARTA' },
  { zipCode: 4002, distrito: 'DAVID', Provincia: 'BIJAGUAL' },
  { zipCode: 4004, distrito: 'DAVID', Provincia: 'CHIRIQUI' },
  { zipCode: 4005, distrito: 'DAVID', Provincia: 'GUACA' },
  { zipCode: 4006, distrito: 'DAVID', Provincia: 'LAS LOMAS' },
  { zipCode: 4007, distrito: 'DAVID', Provincia: 'PEDREGAL' },
  { zipCode: 4009, distrito: 'DAVID', Provincia: 'SAN PABLO NUEVO' },
  { zipCode: 4010, distrito: 'DAVID', Provincia: 'SAN PABLO VIEJO' },
  { zipCode: 4060, distrito: 'DOLEGA', Provincia: 'DOS RIOS' },
  { zipCode: 4061, distrito: 'DOLEGA', Provincia: 'LOS ANASTACIOS' },
  { zipCode: 4062, distrito: 'DOLEGA', Provincia: 'POTRERILLOS' },
  { zipCode: 4063, distrito: 'DOLEGA', Provincia: 'POTRERILLOS ABAJO' },
  { zipCode: 4064, distrito: 'DOLEGA', Provincia: 'ROVIRA' },
  { zipCode: 4074, distrito: 'REMEDIOS', Provincia: 'EL PORVENIR' },
  { zipCode: 4076, distrito: 'REMEDIOS', Provincia: 'SANTA LUCIA' },
  { zipCode: 4048, distrito: 'RENACIMIENTO', Provincia: 'MONTE LIRIO' },
  { zipCode: 4049, distrito: 'RENACIMIENTO', Provincia: 'PLAZA DE CAISAN' },
  { zipCode: 4045, distrito: 'RENACIMIENTO', Provincia: 'RIO SERENO' },
  { zipCode: 4051, distrito: 'RENACIMIENTO', Provincia: 'SANTA CLARA' },
  { zipCode: 4093, distrito: 'SAN FELIX', Provincia: 'SAN FELIX' },
  { zipCode: 4079, distrito: 'SAN LORENZO', Provincia: 'BOCA DEL MONTE' },
  { zipCode: 4080, distrito: 'SAN LORENZO', Provincia: 'SAN JUAN' },
  { zipCode: 4081, distrito: 'SAN LORENZO', Provincia: 'SAN LORENZO' },
  { zipCode: 2042, distrito: 'AGUADULCE', Provincia: 'BARRIOS UNIDOS' },
  { zipCode: 2040, distrito: 'AGUADULCE', Provincia: 'EL ROBLE' },
  { zipCode: 2041, distrito: 'AGUADULCE', Provincia: 'POCRI' },
  { zipCode: 2010, distrito: 'ANTON', Provincia: 'CABALLERO' },
  { zipCode: 2003, distrito: 'ANTON', Provincia: 'EL CHIRU' },
  { zipCode: 2005, distrito: 'ANTON', Provincia: 'EL VALLE' },
  { zipCode: 2007, distrito: 'ANTON', Provincia: 'RIO HATO' },
  { zipCode: 2022, distrito: 'LA PINTADA', Provincia: 'EL HARINO' },
  { zipCode: 2023, distrito: 'LA PINTADA', Provincia: 'EL POTRERO' },
  { zipCode: 2021, distrito: 'LA PINTADA', Provincia: 'LA PINTADA' },
  { zipCode: 2026, distrito: 'LA PINTADA', Provincia: 'LAS LOMAS' },
  { zipCode: 2024, distrito: 'LA PINTADA', Provincia: 'LLANO GRANDE' },
  { zipCode: 2025, distrito: 'LA PINTADA', Provincia: 'PIEDRAS GORDAS' },
  { zipCode: 2028, distrito: 'NATA', Provincia: 'CAPELLANIA' },
  { zipCode: 2029, distrito: 'NATA', Provincia: 'EL CANO' },
  { zipCode: 2031, distrito: 'NATA', Provincia: 'LAS HUACAS' },
  { zipCode: 2027, distrito: 'NATA', Provincia: 'NATA' },
  { zipCode: 2032, distrito: 'NATA', Provincia: 'TOZA' },
  { zipCode: 2013, distrito: 'PENONOME', Provincia: 'COCLE' },
  { zipCode: 2019, distrito: 'PENONOME', Provincia: 'TOABRE' },
  { zipCode: 12001, distrito: 'CHEPIGANA', Provincia: 'LA PALMA' },
  { zipCode: 12013, distrito: 'SANTA FE', Provincia: 'AGUA FRIA' },
  { zipCode: 12016, distrito: 'SANTA FE', Provincia: 'SANTA FE' },
  { zipCode: 120828, distrito: 'CEMACO', Provincia: 'LAJAS BLANCAS' },
  { zipCode: 9002, distrito: 'NA', Provincia: 'NARGANA' },
  { zipCode: 9003, distrito: 'NA', Provincia: 'PUERTO OBALDIA' },
  { zipCode: 9004, distrito: 'NA', Provincia: 'TUBUALA' },
  { zipCode: 5030, distrito: 'LAS MINAS', Provincia: 'LAS MINAS' },
  { zipCode: 5006, distrito: 'LOS POZOS', Provincia: 'LOS POZOS' },
  { zipCode: 5037, distrito: 'OCU', Provincia: 'OCU' },
  { zipCode: 5045, distrito: 'SANTA MARIA', Provincia: 'CHUPAMPA' },
  { zipCode: 5046, distrito: 'SANTA MARIA', Provincia: 'EL RINCON' },
  { zipCode: 5048, distrito: 'SANTA MARIA', Provincia: 'LOS CANELOS' },
  { zipCode: 5044, distrito: 'SANTA MARIA', Provincia: 'SANTA MARIA' },
  { zipCode: 6031, distrito: 'GUARARE', Provincia: 'EL ESPINAL' },
  { zipCode: 6030, distrito: 'GUARARE', Provincia: 'GUARARE' },
  { zipCode: 6033, distrito: 'GUARARE', Provincia: 'GUARARE ARRIBA' },
  { zipCode: 6034, distrito: 'GUARARE', Provincia: 'LA ENEA' },
  { zipCode: 6005, distrito: 'LAS TABLAS', Provincia: 'EL COCAL' },
  { zipCode: 6006, distrito: 'LAS TABLAS', Provincia: 'EL MANANTIAL' },
  { zipCode: 6022, distrito: 'LAS TABLAS', Provincia: 'EL SESTEADERO' },
  { zipCode: 6011, distrito: 'LAS TABLAS', Provincia: 'LA PALMA' },
  { zipCode: 6012, distrito: 'LAS TABLAS', Provincia: 'LA TIZA' },
  { zipCode: 6013, distrito: 'LAS TABLAS', Provincia: 'LAS PALMITAS' },
  { zipCode: 6014, distrito: 'LAS TABLAS', Provincia: 'LAS TABLAS ABAJO' },
  { zipCode: 6015, distrito: 'LAS TABLAS', Provincia: 'NUARIO' },
  { zipCode: 6017, distrito: 'LAS TABLAS', Provincia: 'PENA BLANCA' },
  { zipCode: 6019, distrito: 'LAS TABLAS', Provincia: 'SAN JOSE' },
  { zipCode: 6001, distrito: 'LAS TABLAS', Provincia: 'LAS TABLAS' },
  { zipCode: 6021, distrito: 'LAS TABLAS', Provincia: 'SANTO DOMINGO' },
  { zipCode: 6042, distrito: 'LOS SANTOS', Provincia: 'LA COLORADA' },
  { zipCode: 6043, distrito: 'LOS SANTOS', Provincia: 'LA ESPIGADILLA' },
  { zipCode: 6040, distrito: 'LOS SANTOS', Provincia: 'LA VILLA DE LOS SANTOS' },
  { zipCode: 6044, distrito: 'LOS SANTOS', Provincia: 'LAS CRUCES' },
  { zipCode: 6045, distrito: 'LOS SANTOS', Provincia: 'LAS GUABAS' },
  { zipCode: 6046, distrito: 'LOS SANTOS', Provincia: 'LOS ANGELES' },
  { zipCode: 6047, distrito: 'LOS SANTOS', Provincia: 'LOS OLIVOS' },
  { zipCode: 6048, distrito: 'LOS SANTOS', Provincia: 'LLANO LARGO' },
  { zipCode: 6049, distrito: 'LOS SANTOS', Provincia: 'SABANAGRANDE' },
  { zipCode: 6050, distrito: 'LOS SANTOS', Provincia: 'SANTA ANA' },
  { zipCode: 6051, distrito: 'LOS SANTOS', Provincia: 'TRES QUEBRADAS' },
  { zipCode: 6052, distrito: 'LOS SANTOS', Provincia: 'VILLA LOURDES' },
  { zipCode: 6053, distrito: 'LOS SANTOS', Provincia: 'AGUA BUENA' },
  { zipCode: 6027, distrito: 'POCRI', Provincia: 'LAJAMINA' },
  { zipCode: 6028, distrito: 'POCRI', Provincia: 'PARAISO' },
  { zipCode: 6029, distrito: 'POCRI', Provincia: 'PARITILLA' },
  { zipCode: 6025, distrito: 'POCRI', Provincia: 'POCRI' },
  { zipCode: 6070, distrito: 'TONOSI', Provincia: 'TONOSI' },
  { zipCode: 10003, distrito: 'KANKINTU', Provincia: 'KANKINTU' },
  { zipCode: 7049, distrito: 'CHEPO', Provincia: 'CANITA' },
  { zipCode: 7050, distrito: 'CHEPO', Provincia: 'CHEPILLO' },
  { zipCode: 7051, distrito: 'CHEPO', Provincia: 'EL LLANO' },
  { zipCode: 7052, distrito: 'CHEPO', Provincia: 'LAS MARGARITAS' },
  { zipCode: 7048, distrito: 'CHEPO', Provincia: 'CHEPO' },
  { zipCode: 7054, distrito: 'CHEPO', Provincia: 'TORTI' },
  { zipCode: 7113, distrito: 'PANAMA', Provincia: '24 DE DICIEMBRE' },
  { zipCode: 7098, distrito: 'PANAMA', Provincia: 'ANCON' },
  { zipCode: 7095, distrito: 'PANAMA', Provincia: 'BETHANIA' },
  { zipCode: 7096, distrito: 'PANAMA', Provincia: 'BELLA VISTA' },
  { zipCode: 7093, distrito: 'PANAMA', Provincia: 'CALIDONIA' },
  { zipCode: 7103, distrito: 'PANAMA', Provincia: 'CHILIBRE' },
  { zipCode: 7094, distrito: 'PANAMA', Provincia: 'CURUNDU' },
  { zipCode: 7154, distrito: 'PANAMA', Provincia: 'DON BOSCO' },
  { zipCode: 7091, distrito: 'PANAMA', Provincia: 'EL CHORRILLO' },
  { zipCode: 7101, distrito: 'PANAMA', Provincia: 'JUAN DIAZ' },
  { zipCode: 7104, distrito: 'PANAMA', Provincia: 'LAS CUMBRES' },
  { zipCode: 7105, distrito: 'PANAMA', Provincia: 'PACORA' },
  { zipCode: 7110, distrito: 'PANAMA', Provincia: 'PARQUE LEFEVRE' },
  { zipCode: 7102, distrito: 'PANAMA', Provincia: 'PEDREGAL' },
  { zipCode: 7097, distrito: 'PANAMA', Provincia: 'PUEBLO NUEVO' },
  { zipCode: 7100, distrito: 'PANAMA', Provincia: 'RIO ABAJO' },
  { zipCode: 7090, distrito: 'PANAMA', Provincia: 'SAN FELIPE' },
  { zipCode: 7099, distrito: 'PANAMA', Provincia: 'SAN FRANCISCO' },
  { zipCode: 7106, distrito: 'PANAMA', Provincia: 'SAN MARTIN' },
  { zipCode: 7092, distrito: 'PANAMA', Provincia: 'SANTA ANA' },
  { zipCode: 7107, distrito: 'PANAMA', Provincia: 'TOCUMEN' },
  { zipCode: 7081, distrito: 'SAN MIGUELITO', Provincia: 'AMELIA DENIS DE ICAZA' },
  { zipCode: 7086, distrito: 'SAN MIGUELITO', Provincia: 'ARNULFO ARIAS' },
  { zipCode: 7087, distrito: 'SAN MIGUELITO', Provincia: 'BELISARIO FRIAS' },
  { zipCode: 7082, distrito: 'SAN MIGUELITO', Provincia: 'BELISARIO PORRAS' },
  { zipCode: 7083, distrito: 'SAN MIGUELITO', Provincia: 'JOSE DOMINGO ESPINAR' },
  { zipCode: 7084, distrito: 'SAN MIGUELITO', Provincia: 'MATEO ITURRALDE' },
  { zipCode: 7088, distrito: 'SAN MIGUELITO', Provincia: 'OMAR TORRIJOS' },
  { zipCode: 7089, distrito: 'SAN MIGUELITO', Provincia: 'RUFINA ALFARO' },
  { zipCode: 7085, distrito: 'SAN MIGUELITO', Provincia: 'VICTORIANO LORENZO' },
  { zipCode: 7001, distrito: 'ARRAIJAN', Provincia: 'ARRAIJAN' },
  { zipCode: 7007, distrito: 'ARRAIJAN', Provincia: 'BURUNGA' },
  { zipCode: 7008, distrito: 'ARRAIJAN', Provincia: 'CERRO SILVESTRE' },
  { zipCode: 7002, distrito: 'ARRAIJAN', Provincia: 'JUAN DEMOSTENES AROSEMENA' },
  { zipCode: 7003, distrito: 'ARRAIJAN', Provincia: 'NUEVO EMPERADOR' },
  { zipCode: 7004, distrito: 'ARRAIJAN', Provincia: 'SANTA CLARA' },
  { zipCode: 7005, distrito: 'ARRAIJAN', Provincia: 'VERACRUZ' },
  { zipCode: 7006, distrito: 'ARRAIJAN', Provincia: 'VISTA ALEGRE' },
  { zipCode: 7010, distrito: 'CAPIRA', Provincia: 'CAIMITO' },
  { zipCode: 7011, distrito: 'CAPIRA', Provincia: 'CAMPANA' },
  { zipCode: 7009, distrito: 'CAPIRA', Provincia: 'CAPIRA' },
  { zipCode: 7012, distrito: 'CAPIRA', Provincia: 'CERMENO' },
  { zipCode: 7017, distrito: 'CAPIRA', Provincia: 'LAS OLLAS ARRIBA' },
  { zipCode: 7018, distrito: 'CAPIRA', Provincia: 'LIDICE' },
  { zipCode: 7019, distrito: 'CAPIRA', Provincia: 'VILLA CARMEN' },
  { zipCode: 7020, distrito: 'CAPIRA', Provincia: 'VILLA ROSARIO' },
  { zipCode: 7021, distrito: 'CAPIRA', Provincia: 'SANTA ROSA' },
  { zipCode: 7023, distrito: 'CHAME', Provincia: 'BEJUCO' },
  { zipCode: 7024, distrito: 'CHAME', Provincia: 'BUENOS AIRES' },
  { zipCode: 7025, distrito: 'CHAME', Provincia: 'CABUYA' },
  { zipCode: 7022, distrito: 'CHAME', Provincia: 'CHAME' },
  { zipCode: 7026, distrito: 'CHAME', Provincia: 'CHICA' },
  { zipCode: 7027, distrito: 'CHAME', Provincia: 'EL LIBANO' },
  { zipCode: 7028, distrito: 'CHAME', Provincia: 'LAS LAJAS' },
  { zipCode: 7029, distrito: 'CHAME', Provincia: 'NUEVA GORGONA' },
  { zipCode: 7030, distrito: 'CHAME', Provincia: 'PUNTA CHAME' },
  { zipCode: 7031, distrito: 'CHAME', Provincia: 'SAJALICES' },
  { zipCode: 7032, distrito: 'CHAME', Provincia: 'SORA' },
  { zipCode: 7067, distrito: 'LA CHORRERA', Provincia: 'AROSEMENA' },
  { zipCode: 7065, distrito: 'LA CHORRERA', Provincia: 'BARRIO COLON' },
  { zipCode: 7068, distrito: 'LA CHORRERA', Provincia: 'EL ARADO' },
  { zipCode: 7070, distrito: 'LA CHORRERA', Provincia: 'FEUILLET' },
  { zipCode: 7071, distrito: 'LA CHORRERA', Provincia: 'GUADALUPE' },
  { zipCode: 7072, distrito: 'LA CHORRERA', Provincia: 'HERRERA' },
  { zipCode: 7073, distrito: 'LA CHORRERA', Provincia: 'HURTADO' },
  { zipCode: 7074, distrito: 'LA CHORRERA', Provincia: 'ITURRALDE' },
  { zipCode: 7076, distrito: 'LA CHORRERA', Provincia: 'LOS DIAZ' },
  { zipCode: 7078, distrito: 'LA CHORRERA', Provincia: 'OBALDIA' },
  { zipCode: 7080, distrito: 'LA CHORRERA', Provincia: 'SANTA RITA' },
  { zipCode: 7034, distrito: 'SAN CARLOS', Provincia: 'EL ESPINO' },
  { zipCode: 7035, distrito: 'SAN CARLOS', Provincia: 'EL HIGO' },
  { zipCode: 7036, distrito: 'SAN CARLOS', Provincia: 'GUAYABITO' },
  { zipCode: 7037, distrito: 'SAN CARLOS', Provincia: 'LA ERMITA' },
  { zipCode: 7038, distrito: 'SAN CARLOS', Provincia: 'LA LAGUNA' },
  { zipCode: 7039, distrito: 'SAN CARLOS', Provincia: 'LAS UVAS' },
  { zipCode: 7040, distrito: 'SAN CARLOS', Provincia: 'LOS LLANITOS' },
  { zipCode: 7033, distrito: 'SAN CARLOS', Provincia: 'SAN CARLOS' },
  { zipCode: 7041, distrito: 'SAN CARLOS', Provincia: 'SAN JOSE' },
  { zipCode: 8029, distrito: 'CALOBRE', Provincia: 'CALOBRE' },
  { zipCode: 8014, distrito: 'LA MESA', Provincia: 'BISVALLES' },
  { zipCode: 8015, distrito: 'LA MESA', Provincia: 'BORO' },
  { zipCode: 8013, distrito: 'LA MESA', Provincia: 'LA MESA' },
  { zipCode: 8018, distrito: 'LA MESA', Provincia: 'LOS MILAGROS' },
  { zipCode: 8086, distrito: 'LAS PALMAS', Provincia: 'COROZAL' },
  { zipCode: 8087, distrito: 'LAS PALMAS', Provincia: 'EL MARIA' },
  { zipCode: 8089, distrito: 'LAS PALMAS', Provincia: 'EL RINCON' },
  { zipCode: 8084, distrito: 'LAS PALMAS', Provincia: 'LAS PALMAS' },
  { zipCode: 8092, distrito: 'LAS PALMAS', Provincia: 'PUERTO VIDAL' },
  { zipCode: 8093, distrito: 'LAS PALMAS', Provincia: 'ZAPOTILLO' },
  { zipCode: 8007, distrito: 'SANTIAGO', Provincia: 'CANTO DEL LLANO' },
  { zipCode: 8002, distrito: 'SANTIAGO', Provincia: 'LA COLORADA' },
  { zipCode: 8005, distrito: 'SANTIAGO', Provincia: 'PONUGA' },
  { zipCode: 8011, distrito: 'SANTIAGO', Provincia: 'SAN MARTIN DE PORRES' },
  { zipCode: 8006, distrito: 'SANTIAGO', Provincia: 'SAN PEDRO DEL ESPINO' },
  { zipCode: 8012, distrito: 'SANTIAGO', Provincia: 'URRACA' },
  { zipCode: 3003, distrito: 'COLON', Provincia: 'BUENA VISTA' },
  { zipCode: 3004, distrito: 'COLON', Provincia: 'CATIVA' },
  { zipCode: 3005, distrito: 'COLON', Provincia: 'CIRICITO' },
  { zipCode: 3006, distrito: 'COLON', Provincia: 'CRISTOBAL' },
  { zipCode: 3008, distrito: 'COLON', Provincia: 'LIMON' },
  { zipCode: 3009, distrito: 'COLON', Provincia: 'NUEVA PROVIDENCIA' },
  { zipCode: 3010, distrito: 'COLON', Provincia: 'PUERTO PILON' },
  { zipCode: 3011, distrito: 'COLON', Provincia: 'SABANITAS' },
  { zipCode: 3012, distrito: 'COLON', Provincia: 'SALAMANCA' },
  { zipCode: 3013, distrito: 'COLON', Provincia: 'SAN JUAN' },
  { zipCode: 3016, distrito: 'CHAGRES', Provincia: 'ACHIOTE' },
  { zipCode: 3017, distrito: 'CHAGRES', Provincia: 'EL GUABO' },
  { zipCode: 3018, distrito: 'CHAGRES', Provincia: 'LA ENCANTADA' },
  { zipCode: 3015, distrito: 'CHAGRES', Provincia: 'NUEVO CHAGRES' },
  { zipCode: 3019, distrito: 'CHAGRES', Provincia: 'PALMAS BELLAS' },
  { zipCode: 3020, distrito: 'CHAGRES', Provincia: 'PINA' },
  { zipCode: 3021, distrito: 'CHAGRES', Provincia: 'SALUD' },
  { zipCode: 3025, distrito: 'DONOSO', Provincia: 'GOBEA' },
  { zipCode: 3022, distrito: 'DONOSO', Provincia: 'MIGUEL DE LA BORDA' },
  { zipCode: 3026, distrito: 'DONOSO', Provincia: 'RIO INDIO' },
  { zipCode: 3031, distrito: 'PORTOBELO', Provincia: 'ISLA GRANDE' },
  { zipCode: 3032, distrito: 'PORTOBELO', Provincia: 'MARIA CHIQUITA' },
  { zipCode: 3034, distrito: 'SANTA ISABEL', Provincia: 'CUANGO' },
  { zipCode: 3036, distrito: 'SANTA ISABEL', Provincia: 'NOMBRE DE DIOS' },
  { zipCode: 3039, distrito: 'SANTA ISABEL', Provincia: 'SANTA ISABEL' },
  { zipCode: 3040, distrito: 'SANTA ISABEL', Provincia: 'VIENTO FRIO' },
]
const mediaquery = window.matchMedia('(min-width: 999px)'),
  modalZipCode = () => {
    if (0 === $('.container_modal_zipCode').length) {
      $('.checkout-container').after(
        `<div class="container_modal_zipCode"><div class="modal" tabindex="-1" role="dialog" id="modal_zipCode" style="display: none;" aria-hidden="true"><div class="modal-dialog modal-dialog-modal_zipCode" role="document"><div class="modal-content modal-content_zipCode"><div class="modal-body_filter modal-body_zipCode"><div class="modal-header_zipCode"><div class="modal-header" style="color: white;"><button type="button" data-dismiss="modal" class="btn btn-close" id="btn-close">X<i class="bx bx-x"style="font-size: 2vw !important; margin-top: -50%; margin-left: -50%; color: white;"></i></button></div><h2 class="modal-title_zipCode">C\xf3digos postales Panam\xe1</h2><div class="row-modal_title"><div class="col-modal_title"><h3 class="modal-title_zipCode-h">Consulta el c\xf3digo postal de tu corregimiento</h3></div><div class="col-modal_title"><input type="text" placeholder="Buscar" id="input_zipCode"></div></div><div class="row-modal-header-titles-tr"><div class="col-modal-header-title-tr">C\xf3digo Postal</div><div class="col-modal-header-title-tr">Distrito</div><div class="col-modal-header-title-tr">Provincia</div></div></div><table class="table_zipCode" id="table_zipCode"><thead class="table__thead--margin"></thead><tbody class="tbody__container--tr__child"></tbody></table></div></div></div></div><div class="modal-backdrop  in"></div></div>`
      )
      let e = $('.tbody__container--tr__child')
      for (let t of resultTransform) {
        let a = `<tr class="tr__text_zipCode"><td class="td__text_zipCode_attr">${t.zipCode}</td><td class="td__text_zipCode_attr">${t.distrito}</td><td class="td__text_zipCode_attr">${t.Provincia}</td></tr>`
        e.append(a)
      }
      $('#input_zipCode').on('input', function () {
        var e = $(this).val().toLowerCase()
        $('#table_zipCode tr').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(e) > -1)
        })
      }),
        $('#input_zipCode').on('keyup', function () {
          '' == $(this).val() && $('#table_zipCode tr').show()
        })
    }
    0 === $('.vtex-shipping-preview-0-x-pc .btnZipCode').length &&
      $('.srp-postal-code__form').after("<button class='btn-dark btnZipCode'>Codigos Postales</button>"),
      0 === $('.vtex-omnishipping-1-x-pc .btnZipCode').length &&
        $('.vtex-omnishipping-1-x-postalCodeFrom').after(
          "<button class='btn-dark btnZipCode'>Codigos Postales</button>"
        ),
      0 === $('.vtex-pickup-points-modal-3-x-modalfullPage .btnZipCode').length &&
        $('.vtex-pickup-points-modal-3-x-modalfullPage .ship-postalCode').after(
          "<button class='btn-dark btnZipCode'>Codigos Postales</button>"
        )
  }
$('body').bind('DOMSubtreeModified', function () {
  setTimeout(function () {
    if ($('.newsletter-text').length >= 0 && $('.newsletter-text a').length === 0) {
      $('.newsletter-text').html(
        'Deseo hacer parte del Programa de Fidelización QUIERO. <a target="_blank" href="/institucional/nuestras-politicas">Conoce más aquí.</a>'
      )
      $('#opt-in-newsletter').prop('checked', true)
    }
  }, 1000)
})
$(document).on('click', '.btnZipCode', function () {
  $('#modal_zipCode').show().addClass('modal-active')
}),
  $(document).on('click', '#btn-close, .modal ~ .modal-backdrop', function (e) {
    $('#modal_zipCode').hide().removeClass('modal-active')
  })
const verifyCheckTerm = () => {
  $('.client-profile-data.active').length > 0 &&
    $('.accept-term-condition').length < 1 &&
    $('.newsletter').after(
      `<p class="accept-term-condition"><label class="checkbox accept-term-condition-label"><input type="checkbox" id="opt-in-accept-term-condition"><span class="accept-term-condition-text">He le\xeddo y acepto los t\xe9rminos y condiciones del sitio y las pol\xedticas de privacidad y tratamiento de datos personales que puedes consultar&nbsp;<a href="/institucional/terminos-condiciones">aqu\xed.</a></span></label></p>`
    )
}
$(document).on(
  'click',
  '.client-profile-data.active #go-to-shipping, .client-profile-data.active #go-to-payment',
  function (e) {
    $('#opt-in-accept-term-condition').prop('checked')
      ? $('.accept-term-condition .help.error').remove()
      : (e.preventDefault(),
        $('.client-profile-data.active .accept-term-condition .help.error').length < 1 &&
          $('.accept-term-condition-label').after(
            `<span class="help error">Debes aceptar los t\xe9rminos y condiciones.</span>`
          ))
  }
)
const stepsCart = () => {
    let e = window.location.href.split('/'),
      t = e[e.length - 1],
      a = 'progress',
      i = $('.step')
    switch (t) {
      case 'cart':
        $(a).val(33),
          i[0]?.classList.add('checked'),
          i[1]?.classList.remove('checked'),
          i[2]?.classList.remove('checked')
        break
      case 'email':
        $(a).val(43),
          i[0]?.classList.add('checked'),
          i[1]?.classList.remove('checked'),
          i[2]?.classList.remove('checked')
        break
      case 'profile':
        $(a).val(88), i[0]?.classList.add('checked'), i[1]?.classList.add('checked'), i[2]?.classList.remove('checked')
        break
      case 'shipping':
        $(a).val(92), i[0]?.classList.add('checked'), i[1]?.classList.add('checked'), i[2]?.classList.remove('checked')
        break
      case 'payment':
        $(a).val(96), i[0]?.classList.add('checked'), i[1]?.classList.add('checked'), i[2]?.classList.remove('checked')
        break
      case 'confirmation':
        $(a).val(100), i[2]?.classList.add('checked')
        break
      default:
        i.forEach((e) => {
          e?.classList.remove('checked')
        }),
          $(a).val(0)
    }
  },
  contentTitle = () => {
    $('.CheckoutSteps-container').length < 1 &&
      $('.container-main').prepend(
        '<div class="CheckoutSteps-container"><div class="steps_container"><a class="steps_link_back" href="/">sigue comprando</a></div></div><div class="CartQuantity-container"><div class="CartQuantity-cont"><h2>Bolsa de compras</h2><div class="CartQuantity"><span class="CartQuantity-quantity"></span></div></div></div>'
      )
  },
  elementsInit = () => {
    stepsCart(), contentTitle(), modalZipCode(), verifyCheckTerm(), marginTablePrice(), addSizeItems()
  },
  marginTablePrice = () => {
    $('.cart-active .summary-template-holder').length > 1
      ? $('.cart-active .summary-template-holder').css(
          'transform',
          mediaquery.matches
            ? `translateY(-${$('.cart-active .full-cart.active .cart-more-options').height() ?? '0'}px)`
            : ''
        )
      : $('.summary-template-holder').css('transform', '')
  }

/* ___ event  ___ */

mediaquery.addListener(marginTablePrice)

setInterval(function () {
  elementsInit()
}, 1000)

/* ___ fin event  ___ */

/*Mensaje cupon no valido*/

let mensajeAgregado = false

$(document).ajaxComplete(() => {
  const warningMessages = $(
    '.vtex-front-messages-template.vtex-front-messages-type-warning.vtex-front-messages-template-opened'
  )

  if (
    warningMessages.length &&
    warningMessages.find('.vtex-front-messages-detail').text().includes('Cupón') &&
    !mensajeAgregado
  ) {
    const summaryCoupon = $('.summary-coupon')
    const mensajeHTML =
      '<span style="color: #A80004; border: 1px solid #A80004; display: block; text-align: left; padding: 5px; margin-top: 5px;">El cupón que ingresaste no es válido, por favor revisa la vigencia <a href="https://www.velez.pa/institucional/terminos-condiciones" target="_blank" style="color: #A80004; text-decoration-line: underline;"> disponible aquí</a></span>'

    summaryCoupon.append(mensajeHTML)

    mensajeAgregado = true
  }
})
/*Mensaje cupon no valido*/

/* Crossborder*/

const dominio = window.location.origin
let inicio = 0
let fin = 49
let collecion = 438
let productsCollection = []
let productsFilter = []
let productsCarrito = []
let step_1 = false
let existTable = false

// Convert fetchCollection to return a Promise
const fetchCollection = () => {
  return new Promise((resolve, reject) => {
    const fetchRecursive = () => {
      $.ajax({
        url: `/api/catalog_system/pub/products/search?fq=H:${collecion}&_from=${inicio}&_to=${fin}`,
        success: function (data) {
          let fetchData = data
          inicio = fin + 1
          fin = fin + 50

          if (productsCollection.length > 0) {
            Array.prototype.push.apply(productsCollection, fetchData)
          } else {
            productsCollection = fetchData
          }

          if (fetchData.length >= 50) {
            fetchRecursive()
          } else {
            step_1 = true
            resolve() // Resolve promise when done
          }
        },
        error: function (err) {
          reject(err) // Reject promise if an error occurs
        },
      })
    }
    fetchRecursive()
  })
}

const getProductsTable = () => {
  const table = $('.cart-template.full-cart.span12.active')
  if (!table) {
    return false
  }
  const productsTable = document.querySelectorAll(
    '.cart-template.full-cart.span12.active .cart .table.cart-items tbody tr'
  )
  for (const item of productsTable) {
    const sku = item.getAttribute('data-sku')
    if (sku) {
      for (const element of productsFilter) {
        if (sku === element.id) {
          const nextRow = item.nextElementSibling

          if (!nextRow || !nextRow.classList.contains('item-box-crossborder')) {
            const newRowContent =
              '<td class="item-unavailable-message" colspan="7">  <span class="help-arrow top-arrow"></span>  <i><img style=" width: 20px;" src="https://cuerosvelezpe.vtexassets.com/assets/vtex.file-manager-graphql/images/40621e54-266c-445a-a1ff-f63c23704f69___ed8bd3deacf29aac46360195f71b2733.png" alt="caja crossborder"></i>    <span>Envío internacional desde Colombia.</span>  </td>'

            const newRow = document.createElement('tr')
            newRow.classList.add('item-unavailable')
            newRow.classList.add('item-box-crossborder')
            newRow.innerHTML = newRowContent

            item.parentNode.insertBefore(newRow, item.nextSibling)
          }
          console.log('Hola, ', sku)
        }
      }
    }
  }

  /*Nuevo Resumen*/

  const productsTableResumen = document.querySelectorAll(
    '.row-fluid.orderform-template.span12.active .cart-items.unstyled.clearfix li'
  )
  for (const item of productsTableResumen) {
    const sku = item.getAttribute('data-sku')

    if (sku) {
      for (const element of productsFilter) {
        if (sku === element.id) {
          const nextRow = item.nextElementSibling
          console.log(nextRow, 'nextrow')
          if (!nextRow || !nextRow.classList.contains('item-box-crossborder')) {
            const newRowContent =
              '<li class="item-unavailable-message" colspan="7">  <span class="help-arrow top-arrow"></span>  <i><img style=" width: 20px;" src="https://cuerosvelezpe.vtexassets.com/assets/vtex.file-manager-graphql/images/40621e54-266c-445a-a1ff-f63c23704f69___ed8bd3deacf29aac46360195f71b2733.png" alt="caja crossborder"></i><span>Envío internacional desde Colombia.</span>  </li>'

            const newRow = document.createElement('li')
            newRow.classList.add('item-unavailable')
            newRow.classList.add('item-box-crossborder')
            newRow.innerHTML = newRowContent

            item.parentNode.insertBefore(newRow, item.nextSibling)
          }
        }
      }
    }
  }

  /*Fin Nuevo Resumen*/

  return true
}

const filterProductos = () => {
  for (const productoCollecion of productsCollection) {
    for (const productoCarrito of productsCarrito) {
      if (productoCollecion.productId === productoCarrito.productId) {
        productsFilter.push(productoCarrito)
      }
    }
  }
}

$(document).ready(function () {
  fetchCollection()
    .then(() => {
      console.log('Finished fetching collection. Starting interval logic.')

      // Interval logic starts only after fetchCollection completes
      setInterval(() => {
        const productsTableResumen = document.querySelectorAll(
          '.row-fluid.orderform-template.span12.active .cart-items.unstyled.clearfix .item-box-crossborder'
        )
        const item_crossborder = document.querySelector('.item-box-crossborder')
        if (!existTable || !item_crossborder || productsTableResumen.length <= 0) {
          if (Array.isArray(productsFilter) && productsFilter.length < 1) {
            filterProductos()
            getProductsTable()
          }

          const vtexjsVar = vtexjs
          if (vtexjsVar && vtexjsVar?.checkout?.orderForm?.items) {
            if (!step_1) {
              console.log('prueba step')
              fetchCollection()
            }
            productsCarrito = vtexjs.checkout.orderForm.items
            filterProductos()
            getProductsTable()
            existTable = true
          }
        }
      }, 1000)
    })
    .catch((err) => {
      console.error('Error fetching collection:', err)
    })
})

/* cambio texto fidelizacion*/
const observer = new MutationObserver(() => {
  const newsletterText = document.querySelector('.newsletter-text')

  if (newsletterText && !newsletterText.querySelector('a')) {
    newsletterText.innerHTML = `
            Deseo hacer parte del Programa de Fidelización QUIERO.
            <a target="_blank" href="/institucional/nuestras-politicas">Conoce más aquí.</a>
        `
    $('#opt-in-newsletter').prop('checked', true)
  }
})

// Configura el observador para monitorear cambios en todo el `<body>`
observer.observe(document.body, {
  childList: true, // Monitorea adiciones o eliminaciones de nodos hijo
  subtree: true, // Monitorea todos los descendientes del `<body>`
})

/* cambio texto fidelizacion*/
