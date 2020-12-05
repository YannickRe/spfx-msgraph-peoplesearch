import * as React from 'react';
import { IPersonaCardProps } from './IPersonaCardProps';
import { IPersonaCardState } from './IPersonaCardState';
import {
  Persona,
  IPersonaSharedProps,
  ITheme
} from 'office-ui-fabric-react';
import { TemplateService } from '../../services/TemplateService/TemplateService';
import { isEmpty } from '@microsoft/sp-lodash-subset';


export class PersonaCard extends React.Component<IPersonaCardProps,IPersonaCardState> {
  private determinePersonaConfig(): IPersonaCardProps {
    let processedProps: IPersonaCardProps = this.props;

    if (this.props.fieldsConfiguration && this.props.item) {
        processedProps = TemplateService.processFieldsConfiguration<IPersonaCardProps>(this.props.fieldsConfiguration, this.props.item);
    }

    return processedProps;
  }

  /**
   *
   *
   * @private
   * @returns
   * @memberof PersonaCard
   */
  private _LivePersonaCard() {
    let processedProps: IPersonaCardProps = this.determinePersonaConfig();

    return React.createElement(
      this.props.lpcLibrary.LivePersonaCard,
      {
        className: 'livePersonaCard',
        clientScenario: "PeopleWebPart",
        disableHover: false,
        hostAppPersonaInfo: {
          PersonaType: "User"
        },
        serviceScope: this.props.serviceScope,
        upn: processedProps.upn,
        onCardOpen: () => {
          console.log('LivePersonaCard Open');
        },
        onCardClose: () => {
          console.log('LivePersonaCard Close');
        },
      },
      this._PersonaCard(processedProps)
    );
  }

  /**
   *
   *
   * @private
   * @returns {JSX.Element}
   * @memberof PersonaCard
   */
  private _PersonaCard(processedProps?: IPersonaCardProps): JSX.Element {

    if (isEmpty(processedProps)) {
      processedProps = this.determinePersonaConfig();
    }

    const persona: IPersonaSharedProps = {
      theme: this.props.themeVariant as ITheme,
      text: processedProps.text,
      secondaryText: processedProps.secondaryText,
      tertiaryText: processedProps.tertiaryText,
      optionalText: processedProps.optionalText,
      imageShouldFadeIn: false
    };

    if (!isEmpty(this.props.item.photoUrl)) {
      persona.imageUrl = this.props.item.photoUrl;
    }

    return <Persona {...persona} size={parseInt(this.props.personaSize)} />;
  }

  /**
   *
   *
   * @returns {React.ReactElement<IPersonaCardProps>}
   * @memberof PersonaCard
   */
  public render(): React.ReactElement<IPersonaCardProps> {
    return (
      <React.Fragment>
        {!isEmpty(this.props.lpcLibrary) && this.props.showLPC
          ? this._LivePersonaCard()
          : this._PersonaCard()}
      </React.Fragment>
    );
  }
}
