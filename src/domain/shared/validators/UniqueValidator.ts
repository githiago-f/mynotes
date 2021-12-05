import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments
} from 'class-validator';
import { sequelize } from 'helpers/sequelize';

export function Unique(model: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [ propertyName ],
      options: validationOptions,
      async: true,
      validator: {
        defaultMessage() {
          return 'E-mail already in use';
        },
        async validate(value: any, args: ValidationArguments) {
          const data = await sequelize.model(model).findAll({
            where: { [propertyName]: value }
          });
          if(data instanceof Array && data.length > 0) {
            return false;
          }
          return true;
        },
      },
    });
  }
}
