import type { Schema, Struct } from '@strapi/strapi';

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    batch: Schema.Attribute.String;
    initials: Schema.Attribute.String;
    isPioneer: Schema.Attribute.Boolean;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.Blocks;
    rating: Schema.Attribute.Integer;
    role: Schema.Attribute.String;
  };
}

export interface SharedTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials_sections';
  info: {
    displayName: 'Testimonials Section';
    icon: 'quote';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    preHeading: Schema.Attribute.String;
    testimonials: Schema.Attribute.Component<'shared.testimonial', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.testimonial': SharedTestimonial;
      'shared.testimonials-section': SharedTestimonialsSection;
    }
  }
}
