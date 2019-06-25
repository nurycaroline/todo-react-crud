import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Form = ({
  action,
  handleAdd,
  handleEdit,
  description,
  onChangeDescription,
  done,
  onChangeDone,
}) => {
  const operationFunc = action === 'add' ? () => handleAdd() : () => handleEdit();

  return (
    <div className="form">
      <div className="description_box">
        <Input
          label="Description"
          placeholder="new task"
          className="description"
          id="description"
          type="text"
          value={description}
          onChange={e => onChangeDescription(e.currentTarget.value)}
          onKeyPress={e => (e.keyCode === '13' || e.which === 13
            ? operationFunc()
            : '')
          }
        />
      </div>
      <div className="done_box">
        <Input
          label="Done?"
          type="checkbox"
          checked={done}
          onChange={() => onChangeDone(!done)}
        />
        <span />
      </div>

      <Button
        className="action"
        onClick={operationFunc}
        label={action === 'add' ? 'Add' : 'Update'}
      />
    </div>
  );
};

export default Form;
