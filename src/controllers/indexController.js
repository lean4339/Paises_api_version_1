import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { paginate } from '../helpers/paginator.js';
import { money, continents } from '../data/data.js';

export default {
    getAllCountries: async function (request) {
        return new Promise(async (resolve, reject) => {
           try {
                const response = await axios.get(process.env.ALL_COUNTRIES);
                const data = response.data;
                const page = parseInt(request.query.page) || 1;
                const limit = parseInt(request.query.limit) || 10;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;

                const {results, totalPages, links} = paginate(data, startIndex, endIndex, page, limit, process.env.ENDPOINT_ALL_COUNTRIES);
               
                const countries = [];
                for (let c of results) {
                    const countryResponse = await axios.get(`${process.env.COUNTRY}?sCountryISOCode=${c.sISOCode}`);
                    const countrie = countryResponse.data;
                    const continentObject = {
                        code: countrie.sContinentCode,
                        name: continents.get(countrie.sContinentCode)

                    };
                    let moneyName = money.get(countrie.sCurrencyCode);
                    if(!moneyName){
                        const moneyResponse = await axios.get(`${process.env.MONEY_NAME}?sCurrencyISOCode=${countrie.sCurrencyISOCode}`);
                        moneyName = moneyResponse.data;
                        money.set(countrie.sCurrencyCode, moneyName);
                    }
                    const currencyObject = {
                        code: countrie.sCurrencyISOCode,
                        name: moneyName,
                    };
                    const data = {
                        code: countrie.sISOCode,
                        name: countrie.sName,
                        capitalCity: countrie.sCapitalCity,
                        phoneCode: countrie.sPhoneCode,
                        continent: continentObject,
                        currency: currencyObject,
                        flag: countrie.sCountryFlag,
                        languages: countrie.Languages,
                    }
                    countries.push(data);
                }
                
                resolve({
                    countries,
                    totalPages,
                    currentPage: page,
                    links
                });
            } catch (error) {
                reject({ error: 'error', message: error.message });
            }
        })
    }
}