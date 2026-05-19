import { APIRequestContext, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { USERS } from '../../../config/constants';

export class ProductRequests{
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getProductList(){
        return await this.request.get('/api/productsList');
    }

    async postToAllProductList(){
        const response = await this.request.post('/api/productsList', {
            data: {
            name: 'Test Product',
            id: 999,
            price: 100,
            },
        });
        return response;
    }

    async getAllBrandsList(){
        return await this.request.get('/api/brandsList');
    }

    async putToAllBrandsList(){
        const response = await this.request.put('/api/brandsList', {
            data: {
            name: 'Test Product',
            id: 999,
            price: 100,
            },
        });
        return response;
    }

    async postToSearchProduct(search: string){
        const response = await this.request.post('/api/searchProduct', {
            form: {
                search_product: search,
            },
        });
        return response
    }

    async postToSearchProductWithoutTerm(){
        const response = await this.request.post('/api/searchProduct', {
            form: {

            },
        });
        return response
    }
    async postToVerifyValidLogin() {
        const response = await this.request.post('/api/verifyLogin', {
            form: {
            email: USERS.email,
            password: USERS.password,
            },
        });      
        return response;
    }

    async postToVerifyInvalidLogin() {
        const response = await this.request.post('/api/verifyLogin', {
            form: {
            
            },
        });      
        return response;
    }

    async deleteToVerifyLogin() {
       const response = await this.request.delete('/api/verifyLogin', {
            form: {
                email: USERS.email,
                password: USERS.password,
            },
        });
        return response;   
    }
    
    async postToVerifyLoginInvalidDetails() {
        const response = await this.request.post('/api/verifyLogin', {
            form: {
              email: faker.internet.email(),
              password: faker.internet.password(),
            },
        });
        return response
    }

    async postToCreateAccount(Email: string, Password: string) {
        const Birth_date = faker.date.birthdate();
        const Name = faker.person.fullName();
        const response = await this.request.post('/api/createAccount', {
            form: {
            name: Name,
            email: Email,
            password: Password,
            title: 'Mr',
            birth_date: Birth_date.getDate(),
            birth_month: Birth_date.getMonth(),
            birth_year: Birth_date.getFullYear(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number(),
            },
        });
        return response;
    }

    async postToCreateAccountName(Email: string, Password: string, Name: string): Promise<APIResponse> {
        const Birth_date = faker.date.birthdate();
        const response = await this.request.post('/api/createAccount', {
            form: {
            name: Name,
            email: Email,
            password: Password,
            title: 'Mr',
            birth_date: Birth_date.getDate(),
            birth_month: Birth_date.getMonth(),
            birth_year: Birth_date.getFullYear(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number(),
            },
        });
        return response;
    }

    async deleteAccount(Email: string, Password: string) {
        const response = await this.request.delete('/api/deleteAccount', {
            form: {
                email: Email,
                password: Password,
            },
        });
        return response;
    }

    async putToUpdateAccountDetails(Email: string, Password: string) {
        const Birth_date = faker.date.birthdate();
        const response = await this.request.put('/api/updateAccount', {
            form: {
            name: faker.person.fullName(),
            email: Email,
            password: Password,
            title: 'Mr',
            birth_date: Birth_date.getDate(),
            birth_month: Birth_date.getMonth() + 1,
            birth_year: Birth_date.getFullYear(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number(),
            },
        });
        return response;
    }

    async putToUpdateAccountDetailsName(Email: string, Password: string, Name: string) {
        const Birth_date = faker.date.birthdate();
        const response = await this.request.put('/api/updateAccount', {
            form: {
            name: Name,
            email: Email,
            password: Password,
            title: 'Mr',
            birth_date: Birth_date.getDate(),
            birth_month: Birth_date.getMonth() + 1,
            birth_year: Birth_date.getFullYear(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number(),
            },
        });
        return response;
    }

    async getUserDetails(Email: string) {
        const response = await this.request.get('/api/getUserDetailByEmail', {
            params: {
            email: Email,
            },
        });
        return response;
    }

}