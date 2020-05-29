/* eslint-disable import/extensions */
/* eslint-disable key-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */

export const CASES = [
  {id:'at',name:'Austria',population:8772865,first:'25.2.20',days:[2,2,3,3,9,14,18,21,29,41,55,79,104,131,182,246,302,504,655,860,1018,1332,1646,2013,2388,2814,3582,4474,5283,5588,6909,7657,8271,8788,9618,10180,10711,11129,11524,11781,12051,12297,12639,12942,13244,13555,13806,13945,14041,14226,14336,14476,14595,14671,14749,14795,14873,14925,15002,15071,15148,15225,15274,15357,15402,15452,15531,15558,15597,15621,15650,15684,15752,15774,15833,15871,15882,15961,15997,16058,16109,16201,16242,16269,16321,16353,16404,16436,16486,16503,16539,16557,16591,16628]},
  {id:'cz',name:'Czechia',population:10578820,first:'1.3.20',days:[3,3,5,8,12,18,19,31,31,41,91,94,141,189,253,298,396,464,694,833,995,1120,1236,1394,1654,1925,2279,2631,2817,3001,3308,3508,3858,4091,4472,4587,4822,5017,5312,5569,5732,5831,5991,6059,6111,6216,6433,6549,6606,6746,6900,7033,7132,7187,7273,7352,7404,7445,7504,7579,7682,7737,7755,7781,7819,7896,7974,8031,8077,8095,8123,8176,8221,8269,8351,8406,8455,8475,8586,8647,8721,8754,8813,8890,8955,9002,9050,9086,9140]},
  {id:'de',name:'Germany',population:82521653,first:'27.1.20',days:[1,4,4,4,5,8,10,12,12,12,12,13,13,14,14,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17,27,46,48,79,130,159,196,262,482,670,799,1040,1176,1457,1908,2078,3675,4585,5795,7272,9257,12327,15320,19848,22213,24873,29056,32986,37323,43938,50871,57695,62095,66885,71808,77872,84794,91159,96092,100123,103374,107663,113296,118181,122171,124908,127854,130072,131359,134753,137698,141397,143342,145184,147065,148291,150648,153129,154999,156513,157770,158758,159912,161539,163009,164077,164967,165664,166152,167007,168162,169430,170588,171324,171879,172576,173171,174098,174478,175233,175752,176369,176551,177778,178473,179021,179710,179986,180328,180600,181200,181524,182196]},
  {id:'hu',name:'Hungary',population:9772756,first:'4.3.20',days:[2,2,2,4,7,9,9,13,13,19,30,32,39,50,58,73,85,103,131,167,187,226,261,300,343,408,447,492,525,585,623,678,733,744,817,895,980,1190,1310,1410,1458,1512,1579,1652,1763,1834,1916,1984,2098,2168,2284,2443,2443,2500,2583,2649,2727,2775,2863,2942,2998,3035,3065,3111,3150,3178,3213,3263,3284,3313,3341,3380,3417,3473,3509,3535,3556,3598,3641,3678,3713,3741,3756,3771,3793,3816]},
  {id:'it',name:'Italy',population:60589445,first:'31.1.20',days:[2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,20,62,155,229,322,453,655,888,1128,1694,2036,2502,3089,3858,4636,5883,7375,9172,10149,12462,15113,17660,21157,24747,27980,31506,35713,41035,47021,53578,59138,63927,69176,74386,80589,86498,92472,97689,101739,105792,110574,115242,119827,124632,128948,132547,135586,139422,143626,147577,152271,156363,159516,162488,165155,168941,172434,175925,178972,181228,183957,187327,189973,192994,195351,197675,199414,201505,203591,205463,207428,209328,210717,211938,213013,214457,215858,217185,218268,219070,219814,221216,222104,223096,223885,224760,225435,225886,226699,227364,228006,228658,229327,229858,230158,230555,231139,231732]},
  {id:'kr',name:'Korea, South',population:51709098,first:'22.1.20',days:[1,1,2,2,3,4,4,4,4,11,12,15,15,16,19,23,24,24,25,27,28,28,28,28,28,29,30,31,31,104,204,433,602,833,977,1261,1766,2337,3150,3736,4335,5186,5621,6088,6593,7041,7314,7478,7513,7755,7869,7979,8086,8162,8236,8320,8413,8565,8652,8799,8961,8961,9037,9137,9241,9332,9478,9583,9661,9786,9887,9976,10062,10156,10237,10284,10331,10384,10423,10450,10480,10512,10537,10564,10591,10613,10635,10653,10661,10674,10683,10694,10708,10718,10728,10738,10752,10761,10765,10774,10780,10793,10801,10804,10806,10810,10822,10840,10874,10909,10936,10962,10991,11018,11037,11050,11065,11078,11110,11122,11142,11165,11190,11206,11225,11265,11344,11402]},
  {id:'no',name:'Norway',population:5367580,first:'26.2.20',days:[1,1,6,15,19,25,32,56,87,108,147,176,205,400,598,702,996,1090,1221,1333,1463,1550,1746,1914,2118,2385,2621,2863,3084,3369,3755,4015,4284,4445,4641,4863,5147,5370,5550,5687,5865,6086,6086,6211,6314,6409,6525,6603,6623,6740,6896,6937,7036,7078,7156,7191,7338,7401,7463,7499,7527,7599,7660,7710,7738,7783,7809,7847,7904,7955,7996,8034,8070,8099,8105,8132,8157,8175,8196,8219,8237,8249,8257,8267,8281,8309,8332,8346,8352,8364,8383,8401,8411]},
  {id:'pl',name:'Poland',population:37972964,first:'4.3.20',days:[1,1,5,5,11,16,22,31,49,68,103,119,177,238,251,355,425,536,634,749,901,1051,1221,1389,1638,1862,2055,2311,2554,2946,3383,3627,4102,4413,4848,5205,5575,5955,6356,6674,6934,7202,7582,7918,8379,8742,9287,9593,9856,10169,10511,10892,11273,11617,11902,12218,12640,12877,13105,13375,13693,14006,14431,14740,15047,15366,15651,15996,16326,16921,17204,17615,18016,18257,18529,18885,19268,19739,20143,20619,20931,21326,21631,22074,22473,22825]},
  {id:'sk',name:'Slovakia',population:5435343,first:'6.3.20',days:[1,1,3,3,7,10,16,32,44,54,63,72,105,123,137,178,185,186,204,216,226,269,292,314,336,363,400,426,450,471,485,534,581,682,701,715,728,742,769,835,863,977,1049,1089,1161,1173,1199,1244,1325,1360,1373,1379,1381,1384,1391,1396,1403,1407,1408,1413,1421,1429,1445,1455,1455,1457,1457,1465,1469,1477,1480,1493,1494,1495,1495,1496,1502,1503,1504,1509,1511,1513,1515,1520]},
  {id:'es',name:'Spain',population:46528966,first:'1.2.20',days:[1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,13,15,32,45,84,120,165,222,259,400,500,673,1073,1695,2277,2277,5232,6391,7798,9942,11748,13910,17963,20410,25374,28768,35136,39885,49515,57786,65719,73235,80110,87956,95923,104118,112065,119199,126168,131646,136675,141942,148220,153222,158273,163027,166831,170099,172541,177644,184948,190839,191726,198674,200210,204178,208389,213024,202990,205905,207634,209465,210773,212917,213435,215216,216582,217466,218011,219329,220325,221447,222857,223578,224350,227436,228030,228691,229540,230183,230698,230698,231606,232037,232555,233037,234824,235290,235772,235400,236259,236259,237906]},
  {id:'se',name:'Sweden',population:10333456,first:'31.1.20',days:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,7,7,12,14,15,21,35,94,101,161,203,248,355,500,599,814,961,1022,1103,1190,1279,1439,1639,1763,1934,2046,2286,2526,2840,3069,3447,3700,4028,4435,4947,5568,6131,6443,6830,7206,7693,8419,9141,9685,10151,10483,10948,11445,11927,12540,13216,13822,14385,14777,15322,16004,16755,17567,18177,18640,18926,19621,20302,21092,21520,22082,22317,22721,23216,23918,24623,25265,25921,26322,26670,27272,27909,28582,29207,29677,30143,30377,30799,31523,32172,32809,33188,33459,33843,34440,35088,35727]},
  {id:'us',name:'US',population:328239523,first:'22.1.20',days:[1,1,2,2,5,5,5,5,5,7,8,8,11,11,11,11,11,11,11,11,12,12,13,13,13,13,13,13,13,13,15,15,15,51,51,57,58,60,68,74,98,118,149,219,267,403,519,588,962,1285,1667,2181,2729,3536,4661,6437,7781,13748,19274,25600,33280,43862,53925,65844,83836,101962,121786,140910,162147,188172,213602,244008,275798,309027,336802,366317,397121,428654,463327,496846,526776,555313,580624,607670,636674,667981,700062,732590,758809,784708,811865,840351,869170,905358,938154,965785,988197,1012582,1039909,1069424,1103461,1132539,1158040,1180375,1204351,1229331,1257023,1283929,1309550,1329260,1347881,1369376,1390406,1417774,1442824,1467820,1486757,1508308,1528568,1551853,1577147,1600937,1622612,1643246,1662302,1680913,1699176,1721753]},
];

export const CASES_ACTIVE = [
  {id:'at',name:'Austria',population:8772865,first:'25.2.20',days:[2,2,3,3,9,14,18,21,29,41,55,79,104,129,178,242,297,497,648,853,1009,1328,1633,1998,2373,2797,3557,4444,5246,5549,6748,7374,7978,8223,8874,8957,9129,9222,9334,9088,8849,8614,8350,8157,7709,7172,6865,6608,6330,6209,5845,5080,4460,4014,3796,3694,3411,3087,2786,2669,2509,2401,2363,2208,2043,1961,1832,1782,1771,1705,1582,1437,1445,1324,1290,1262,1201,1190,1069,1027,1010,1048,1050,1026,1011,838,820,796,810,800,760,732,718,674]},
  {id:'cz',name:'Czechia',population:10578820,first:'1.3.20',days:[3,3,5,8,12,18,19,31,31,41,91,94,141,189,253,295,393,461,691,829,989,1113,1229,1381,1638,1906,2259,2609,2790,2953,3232,3408,3747,3966,4335,4424,4623,4757,4980,5156,5267,5291,5389,5397,5308,5231,5292,5202,5198,5262,5147,5079,4935,4825,4688,4681,4639,4396,4329,4244,4132,4125,4049,3946,3760,3633,3507,3390,3391,3372,3369,3183,3049,2932,2817,2730,2737,2715,2648,2619,2587,2522,2476,2532,2562,2503,2463,2399,2361]},
  {id:'de',name:'Germany',population:82521653,first:'27.1.20',days:[1,4,4,4,5,8,10,12,12,12,12,13,13,14,14,16,16,15,15,15,15,15,4,4,4,2,2,2,2,3,12,30,32,63,114,143,180,246,466,653,781,1022,1156,1437,1880,2050,3622,4530,5738,7188,9166,12194,15163,19601,21896,24513,28667,29586,33570,37998,43871,48781,52351,52740,54933,58252,61247,65309,68248,69839,72864,69566,64647,63167,65491,64772,64532,62578,59865,58349,56646,53931,53483,52598,50703,48058,45969,44254,39439,40836,39794,38132,36198,34672,32886,30441,29155,28198,26459,24914,20987,20338,21378,20475,19910,19298,18233,17537,16294,15739,15214,14396,13507,14016,13363,12731,12418,12009,11764,11092,10861,10276,10366]},
  {id:'hu',name:'Hungary',population:9772756,first:'4.3.20',days:[2,2,2,4,7,9,9,13,13,19,29,30,37,47,55,70,80,92,109,144,157,195,223,256,298,361,398,439,465,522,554,588,633,639,699,743,818,1001,1110,1193,1229,1268,1253,1311,1400,1431,1477,1518,1598,1648,1655,1723,1723,1743,1805,1842,1891,1882,1931,1982,2029,2054,1993,1979,1966,1921,1904,1917,1905,1881,1809,1775,1688,1654,1662,1673,1677,1674,1659,1615,1576,1565,1554,1436,1432,1311]},
  {id:'it',name:'Italy',population:60589445,first:'31.1.20',days:[2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,19,59,150,221,311,438,593,821,1053,1577,1835,2263,2706,3296,3916,5061,6387,7985,8794,10590,13052,14955,17750,20603,23073,26062,28710,33190,38549,42681,46638,50826,54030,57521,62013,66414,70065,73880,75528,77635,80572,83049,85388,88274,91246,93187,94067,95262,96877,98273,100269,102253,103616,104291,105418,106607,106962,107771,108257,108237,107709,107699,106848,106527,105847,106103,105813,105205,104657,101551,100943,100704,100179,99980,98467,91528,89624,87961,84842,83324,82488,81266,78457,76440,72070,70187,68351,66553,65129,62752,60960,59322,57752,56594,55300,52942,50966,47986]},
  {id:'kr',name:'Korea, South',population:51709098,first:'22.1.20',days:[1,1,2,2,3,4,4,4,4,11,12,15,15,16,19,23,23,23,22,24,25,21,21,21,19,20,20,19,19,87,186,415,578,807,945,1227,1731,2302,3107,3689,4277,5128,5545,6012,6416,6862,7146,7307,7212,7407,7470,7403,7504,7577,7024,6832,6789,6934,7018,7157,5941,5941,5410,5281,4966,4665,4523,4398,4275,4216,4155,3979,3867,3654,3591,3500,3445,3408,3246,3125,3026,2930,2873,2808,2750,2627,2576,2484,2385,2324,2233,2179,1967,1843,1769,1731,1654,1593,1459,1454,1407,1360,1332,1267,1218,1135,1082,1016,1008,1021,1008,1008,969,937,924,900,898,877,781,723,716,705,711,713,681,701,735,770]},
  {id:'no',name:'Norway',population:5367580,first:'26.2.20',days:[1,1,6,15,19,25,32,56,87,108,147,176,204,399,597,701,995,1086,1217,1329,1459,1543,1738,1906,2110,2377,2610,2845,3064,3349,3730,3985,4252,4401,4589,4806,5065,5279,5456,5584,5757,5965,5953,6071,6169,6258,6365,6437,6452,6558,6712,6744,6840,6881,6943,6977,7119,7175,7232,7266,7294,7362,7422,7471,7496,7541,7566,7604,7658,7708,7748,7785,7820,7848,7854,7876,7897,7914,7932,7955,7973,7985,7992,8002,8015,8042,370,384,390,402,421,439,448]},
  {id:'pl',name:'Poland',population:37972964,first:'4.3.20',days:[1,1,5,5,11,16,22,31,48,66,100,116,160,220,233,349,419,530,626,740,890,1030,1198,1366,1613,1833,2017,2271,2464,2833,3256,3432,3874,4144,4528,4824,5117,5456,5773,6003,6202,6321,6628,6830,7181,7414,7887,8080,8158,8230,8317,8454,8623,8817,8874,8967,8991,8997,8963,8949,9070,9213,9435,9352,9430,9406,9429,9498,9699,9951,9933,10036,10191,10167,10153,10321,10417,10594,10719,10906,10961,11136,11348,11030,11115,11227]},
  {id:'sk',name:'Slovakia',population:5435343,first:'6.3.20',days:[1,1,3,3,7,10,16,32,44,54,63,72,104,122,136,177,178,179,197,209,224,267,290,312,329,360,396,420,439,460,474,524,566,664,676,690,703,717,660,720,706,802,865,865,920,909,927,946,1022,988,970,967,960,941,885,849,822,775,765,745,655,642,613,524,510,490,472,455,382,338,322,314,303,282,275,237,229,219,196,180,176,163,160,160]},
  {id:'es',name:'Spain',population:46528966,first:'1.2.20',days:[1,1,1,1,1,1,1,1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,4,11,13,30,43,82,118,162,218,254,393,460,626,1013,1628,2040,2039,4906,5679,6992,9070,10187,12206,16026,17779,21874,24421,30250,33283,40501,46406,51224,54968,58598,63460,68200,72084,74974,77488,80002,80925,82897,84689,85407,85610,86524,87312,87231,87616,86981,88083,90836,96040,96886,100864,98771,100382,100757,101617,88111,87295,86072,85069,84403,79695,76842,78623,74234,73300,71240,70230,68466,66866,65410,63148,61563,63553,62130,60764,58845,57941,56689,56689,53521,53883,54291,54721,55820,56236,56644,58190,58766,58766,60411]},
  {id:'se',name:'Sweden',population:10333456,first:'31.1.20',days:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,7,7,12,14,15,21,35,94,101,161,203,247,354,498,597,812,958,1018,1096,1182,1268,1412,1607,1727,1897,2005,2234,2448,2747,2948,3326,3574,3866,4239,4605,5157,5568,5865,6224,6524,6897,7527,8143,8434,8883,9203,9648,10031,10343,10657,11266,11761,12295,12647,13007,13517,14184,14410,14980,15441,15647,16261,16835,17501,17862,18408,18633,15878,16288,16903,16612,17119,17730,18126,18443,18988,19478,20082,20590,21032,21493,21708,22085,22721,23330,23913,24225,24490,24843,25344,25897,26490]},
  {id:'us',name:'US',population:328239523,first:'22.1.20',days:[1,1,2,2,5,5,5,5,5,7,8,8,11,11,11,11,11,11,8,8,9,9,10,10,10,10,10,10,10,10,10,10,10,46,45,51,52,53,60,66,85,104,131,200,246,379,491,559,926,1241,1613,2119,2657,3450,4544,6286,7511,13368,18777,24982,32515,42898,52566,64163,81429,98824,117970,134825,152307,175781,198617,227069,256831,283505,306979,332842,359167,386825,417629,445699,471140,496239,509272,529645,551818,578434,604089,627975,647527,669693,691575,715573,739243,754786,784027,803916,820554,838291,858222,852481,874503,890788,910206,924273,943496,965966,986325,1007756,1018221,1033565,1034466,1056733,1062857,1085462,1104547,1110690,1124930,1134783,1147255,1164102,1184027,1154824,1164287,1178791,1184926,1197099,1207251,1220146]},
];

export const DEFAULT_CASES = ['sk', 'cz', 'at'];
