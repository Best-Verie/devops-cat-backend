import { Apartment } from "./apartment.entity"

describe('Apartment class', () => {

    it('should make an apartment with name fields', () => {
        const apartment = new Apartment('IMENA');
        expect(apartment).toBeTruthy();
        expect(apartment.name).toBe('IMENA')
    })


   it('should make an apartment with no fields', () => {
        const apartment = new Apartment('');
        expect(apartment).toBeTruthy();
        expect(apartment.name).toBe('')
    })

    

  
})
