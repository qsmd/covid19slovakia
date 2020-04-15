/* eslint-disable import/extensions */
/* eslint-disable key-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */

import SK from './sk-cases.js';
import CZ from './cz-cases.js';

export const CASES = [
  SK, CZ,
  {id:'at',name:'Austria',population:8772865,first:'25.2.20',days:[2,2,3,3,9,14,18,21,29,41,55,79,104,131,182,246,302,504,655,860,1018,1332,1646,2013,2388,2814,3582,4474,5283,5588,6909,7657,8271,8788,9618,10180,10711,11129,11524,11781,12051,12297,12639,12942,13244,13555,13806,13945,14041,14226]},
  {id:'de',name:'Germany',population:82521653,first:'27.1.20',days:[1,4,4,4,5,8,10,12,12,12,12,13,13,14,14,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17,27,46,48,79,130,159,196,262,482,670,799,1040,1176,1457,1908,2078,3675,4585,5795,7272,9257,12327,15320,19848,22213,24873,29056,32986,37323,43938,50871,57695,62095,66885,71808,77872,84794,91159,96092,100123,103374,107663,113296,118181,122171,124908,127854,130072,131359]},
  {id:'hu',name:'Hungary',population:9772756,first:'4.3.20',days:[2,2,2,4,7,9,9,13,13,19,30,32,39,50,58,73,85,103,131,167,187,226,261,300,343,408,447,492,525,585,623,678,733,744,817,895,980,1190,1310,1410,1458,1512]},
  {id:'it',name:'Italy',population:60589445,first:'31.1.20',days:[2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,20,62,155,229,322,453,655,888,1128,1694,2036,2502,3089,3858,4636,5883,7375,9172,10149,12462,12462,17660,21157,24747,27980,31506,35713,41035,47021,53578,59138,63927,69176,74386,80589,86498,92472,97689,101739,105792,110574,115242,119827,124632,128948,132547,135586,139422,143626,147577,152271,156363,159516,162488]},
  {id:'kr',name:'Korea, South',population:51709098,first:'22.1.20',days:[1,1,2,2,3,4,4,4,4,11,12,15,15,16,19,23,24,24,25,27,28,28,28,28,28,29,30,31,31,104,204,433,602,833,977,1261,1766,2337,3150,3736,4335,5186,5621,6088,6593,7041,7314,7478,7513,7755,7869,7979,8086,8162,8236,8320,8413,8565,8652,8799,8961,8961,9037,9137,9241,9332,9478,9583,9661,9786,9887,9976,10062,10156,10237,10284,10331,10384,10423,10450,10480,10512,10537,10564]},
  {id:'no',name:'Norway',population:5367580,first:'26.2.20',days:[1,1,6,15,19,25,32,56,87,108,147,176,205,400,598,702,996,1090,1221,1333,1463,1550,1746,1914,2118,2385,2621,2863,3084,3369,3755,4015,4284,4445,4641,4863,5147,5370,5550,5687,5865,6086,6086,6211,6314,6409,6525,6603,6623]},
  {id:'pl',name:'Poland',population:37972964,first:'4.3.20',days:[1,1,5,5,11,16,22,31,49,68,103,119,177,238,251,355,425,536,634,749,901,1051,1221,1389,1638,1862,2055,2311,2554,2946,3383,3627,4102,4413,4848,5205,5575,5955,6356,6674,6934,7202]},
  {id:'es',name:'Spain',population:46528966,first:'1.2.20',days:[1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,13,15,32,45,84,120,165,222,259,400,500,673,1073,1695,2277,2277,5232,6391,7798,9942,11748,13910,17963,20410,25374,28768,35136,39885,49515,57786,65719,73235,80110,87956,95923,104118,112065,119199,126168,131646,136675,141942,148220,153222,158273,163027,166831,170099,172541]},
  {id:'se',name:'Sweden',population:10333456,first:'31.1.20',days:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,7,7,12,14,15,21,35,94,101,161,203,248,355,500,599,814,961,1022,1103,1190,1279,1439,1639,1763,1934,2046,2286,2526,2840,3069,3447,3700,4028,4435,4947,5568,6131,6443,6830,7206,7693,8419,9141,9685,10151,10483,10948,11445]},
  {id:'us',name:'US',population:328239523,first:'22.1.20',days:[1,1,2,2,5,5,5,5,5,7,8,8,11,11,11,11,11,11,11,11,12,12,13,13,13,13,13,13,13,13,15,15,15,51,51,57,58,60,68,74,98,118,149,217,262,402,518,583,959,1281,1663,2179,2727,3499,4632,6421,7783,13747,19273,25600,33276,43847,53740,65778,83836,101657,121465,140909,161831,188172,213372,243762,275586,308853,337072,366667,396223,429052,461437,496535,526396,555313,580619,607670]},
];
export const DEFAULT_CASES = ['sk', 'cz', 'at', 'hu', 'pl'];

export const CASES_ACTIVE = [
  {id:'at',name:'Austria',population:8772865,first:'25.2.20',days:[2,2,3,3,9,14,18,21,29,41,55,79,104,129,178,242,297,497,648,853,1009,1328,1633,1998,2373,2797,3557,4444,5246,5549,6748,7374,7978,8223,8874,8957,9129,9222,9334,9088,8849,8614,8350,8157,7709,7172,6865,6608,6330,6209]},
  {id:'cz',name:'Czechia',population:10578820,first:'1.3.20',days:[3,3,5,8,12,18,19,31,31,41,91,94,141,189,253,295,393,461,691,829,989,1113,1229,1381,1638,1906,2259,2609,2790,2953,3232,3408,3747,3966,4335,4424,4623,4757,4980,5156,5267,5291,5389,5397,5308]},
  {id:'de',name:'Germany',population:82521653,first:'27.1.20',days:[1,4,4,4,5,8,10,12,12,12,12,13,13,14,14,16,16,15,15,15,15,15,4,4,4,2,2,2,2,3,12,30,32,63,114,143,180,246,466,653,781,1022,1156,1437,1880,2050,3622,4530,5738,7188,9166,12194,15163,19601,21896,24513,28667,29586,33570,37998,43871,48781,52351,52740,54933,58252,61247,65309,68248,69839,72864,69566,64647,63167,65491,64772,64532,62578,59865]},
  {id:'hu',name:'Hungary',population:9772756,first:'4.3.20',days:[2,2,2,4,7,9,9,13,13,19,29,30,37,47,55,70,80,92,109,144,157,195,223,256,298,361,398,439,465,522,554,588,633,639,699,743,818,1001,1110,1193,1229,1268]},
  {id:'it',name:'Italy',population:60589445,first:'31.1.20',days:[2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,19,59,150,221,311,438,593,821,1053,1577,1835,2263,2706,3296,3916,5061,6387,7985,8794,10590,10590,14955,17750,20603,23073,26062,28710,33190,38549,42681,46638,50826,54030,57521,62013,66414,70065,73880,75528,77635,80572,83049,85388,88274,91246,93187,94067,95262,96877,98273,100269,102253,103616,104291]},
  {id:'kr',name:'Korea, South',population:51709098,first:'22.1.20',days:[1,1,2,2,3,4,4,4,4,11,12,15,15,16,19,23,23,23,22,24,25,21,21,21,19,20,20,19,19,87,186,415,578,807,945,1227,1731,2302,3107,3689,4277,5128,5545,6012,6416,6862,7146,7307,7212,7407,7470,7403,7504,7577,7024,6832,6789,6934,7018,7157,5941,5941,5410,5281,4966,4665,4523,4398,4275,4216,4155,3979,3867,3654,3591,3500,3445,3408,3246,3125,3026,2930,2873,2808]},
  {id:'no',name:'Norway',population:5367580,first:'26.2.20',days:[1,1,6,15,19,25,32,56,87,108,147,176,204,399,597,701,995,1086,1217,1329,1459,1543,1738,1906,2110,2377,2610,2845,3064,3349,3730,3985,4252,4401,4589,4806,5065,5279,5456,5584,5757,5965,5953,6071,6169,6258,6365,6437,6452]},
  {id:'pl',name:'Poland',population:37972964,first:'4.3.20',days:[1,1,5,5,11,16,22,31,48,66,100,116,160,220,233,349,419,530,626,740,890,1030,1198,1366,1613,1833,2017,2271,2464,2833,3256,3432,3874,4144,4528,4824,5117,5456,5773,6003,6202,6321]},
  {id:'sk',name:'Slovakia',population:5435343,first:'6.3.20',days:[1,1,3,3,7,10,16,32,44,54,63,72,104,122,136,177,178,179,197,209,224,267,290,312,329,360,396,420,439,460,474,524,566,664,676,690,703,717,660,720]},
  {id:'es',name:'Spain',population:46528966,first:'1.2.20',days:[1,1,1,1,1,1,1,1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,4,11,13,30,43,82,118,162,218,254,393,460,626,1013,1628,2040,2039,4906,5679,6992,9070,10187,12206,16026,17779,21874,24421,30250,33283,40501,46406,51224,54968,58598,63460,68200,72084,74974,77488,80002,80925,82897,84689,85407,85610,86524,87312,87231,87616,86981]},
  {id:'se',name:'Sweden',population:10333456,first:'31.1.20',days:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,7,7,12,14,15,21,35,94,101,161,203,247,354,498,597,812,958,1018,1096,1182,1268,1412,1607,1727,1897,2005,2234,2448,2747,2948,3326,3574,3866,4239,4605,5157,5568,5865,6224,6524,6897,7527,8143,8434,8883,9203,9648,10031]},
  {id:'us',name:'US',population:328239523,first:'22.1.20',days:[1,1,2,2,5,5,5,5,5,7,8,8,11,11,11,11,11,11,8,8,9,9,10,10,10,10,10,10,10,10,10,10,10,46,45,51,52,53,60,66,85,104,131,198,241,378,490,554,923,1237,1611,2120,2661,3424,4530,6296,7560,13426,18882,25117,32681,43112,52686,64475,81946,99207,118367,135777,153209,177275,200141,228835,258792,285794,310005,336303,361738,390798,419549,449159,474663,500305,513608,534075]},
];
