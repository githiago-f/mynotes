import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments
} from 'class-validator';
import { sequelize } from 'helpers/sequelize';

export function Unique(validationOptions?: ValidationOptions) {
  return function (object: Function, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [ propertyName ],
      options: validationOptions,
      async: true,
      validator: {
        defaultMessage() {
          return 'E-mail already taken';
        },
        async validate(value: any, args: ValidationArguments) {
          const data = await sequelize.model('User').findAll({
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
