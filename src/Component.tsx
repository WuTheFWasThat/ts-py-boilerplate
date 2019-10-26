import React from 'react';

export type ComponentProps = {
  message: string,
};
export type ComponentState = {};


class Component extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
          {this.props.message}
      </div>
    );
  }
}

export default Component;
