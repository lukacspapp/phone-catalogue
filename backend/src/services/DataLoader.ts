import path from 'path';
import fs from 'fs';
import { Value } from '@sinclair/typebox/value';
import { Phone, PhoneSchema } from '../types/phone';
import { appConfig } from '../config';

class DataLoader {
  private phones: Phone[] = [];
  private isLoaded = false;

  private loadPhonesFromFile(): Phone[] {
    try {
      const phonesPath = path.join(__dirname, appConfig.dataPath);
      const data = fs.readFileSync(phonesPath, 'utf8');
      const rawPhones = JSON.parse(data);

      const validatedPhones = rawPhones.map((phone: unknown, index: number) => {
        if (!Value.Check(PhoneSchema, phone)) {
          const errors = [...Value.Errors(PhoneSchema, phone)];
          throw new Error(`Invalid phone data at index ${index}: ${JSON.stringify(errors)}`);
        }
        return phone as Phone;
      });

      console.log(`Loaded ${validatedPhones.length} phones successfully`);
      return validatedPhones;
    } catch (error) {
      console.error('Error loading phones data:', error);
      throw error;
    }
  }

  public getPhones(): Phone[] {
    if (!this.isLoaded) {
      try {
        this.phones = this.loadPhonesFromFile();
        this.isLoaded = true
      } catch (error) {
        return [];
      }
    }
    return this.phones;
  }

  public getPhoneById(id: number): Phone | undefined {
    const phones = this.getPhones();
    return phones.find(phone => phone.id === id);
  }

  public getPhonesCount(): number {
    return this.getPhones().length;
  }
}

export const dataLoader = new DataLoader();
