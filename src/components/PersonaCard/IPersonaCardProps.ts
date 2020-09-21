import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IComponentFieldsConfiguration } from "../../services/TemplateService/TemplateService";
import { ServiceScope } from '@microsoft/sp-core-library';
import { ExtendedUser } from '../../models/ExtendedUser';

export interface IPersonaCardProps {
  serviceScope: ServiceScope;
  item?: ExtendedUser;
  fieldsConfiguration?: IComponentFieldsConfiguration[];
  personaSize?: string;
  themeVariant?: IReadonlyTheme;
  showLPC: boolean;
  lpcLibrary?: any;
  // Individual content properties (i.e web component attributes)
  text?: string;
  secondaryText?: string;
  tertiaryText?: string;
  optionalText?: string;
  upn?: string;
}
