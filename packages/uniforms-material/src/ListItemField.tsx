import ListItemMaterial, {
  ListItemProps as ListItemMaterialProps,
} from '@material-ui/core/ListItem';
import React, { Children, ReactNode } from 'react';
import { connectField, joinName } from 'uniforms';

import ListDelField from './ListDelField';
import AutoField from './AutoField';

type ListItemProps = {
  children?: ReactNode;
  removeIcon?: any;
  name: string;
} & Pick<ListItemMaterialProps, 'dense' | 'divider' | 'disableGutters'>;

const ListItem = (props: ListItemProps) => {
  const { dense, children, divider, disableGutters, name, removeIcon } = props;
  return (
    <ListItemMaterial
      dense={dense}
      divider={divider}
      disableGutters={disableGutters}
    >
      {children ? (
        Children.map(children as JSX.Element, child =>
          React.cloneElement(child, {
            name: joinName(name, child.props.name),
            label: null,
          }),
        )
      ) : (
        <AutoField {...props} />
      )}
      <ListDelField name={name} icon={removeIcon} />
    </ListItemMaterial>
  );
};

ListItem.defaultProps = {
  dense: true,
};

export default connectField(ListItem, { includeInChain: false });
