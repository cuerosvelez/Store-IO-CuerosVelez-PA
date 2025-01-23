import { FunctionComponent } from 'react';

declare global {
  interface StorefrontFunctionComponent<Props = GenericObject>
    extends FunctionComponent<Props> {
    getSchema?: (props: Props) => Schema;
    schema?: Schema;
    defaultProps?: Props;
  }

  interface StorefrontComponent<P = GenericObject, S = GenericObject>
    extends Component<P, S> {
    getSchema?(props: P): GenericObject;
    schema: GenericObject;
  }
}
interface Schema {
  title: string;
  type?: Extract<SchemaType, 'object'>;
  properties?: SchemaProperties;
  dependencies?: SchemaDependencies;
}

export type SchemaType = 'array' | 'object' | 'string' | 'boolean' | 'number';
export type UiWidget =
  | 'image-uploader'
  | 'textarea'
  | 'datetime'
  | 'select'
  | 'color';

export interface SchemaDependencies {
  [key: string]: {
    oneOf: {
      properties: {
        [key: string]: Partial<SchemaItemProperty>;
      };
    }[];
  };
}

export interface SchemaProperties {
  __editorItemTitle?: {
    default: string;
    title: string;
    type: Extract<SchemaType, 'string'>;
  };
  [key: string]: SchemaItemProperty;
}

export interface SchemaItemProperty {
  type: SchemaType;
  enumNames?: string[]; //esse funciona junto com o enum
  enum?: string[];
  default?: any;
  title?: string;
  description?: string;
  properties?: SchemaProperties;
  format?: 'date-time';
  widget?: {
    'ui:widget'?: UiWidget;
  };
  items?: {
    type: SchemaType;
    title?: string;
    properties?: SchemaProperties;
    default?: any;
  };
}
