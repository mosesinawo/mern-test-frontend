import type { Meta, StoryObj } from '@storybook/react';
import { Task, TaskProps } from './Task';
import { action } from '@storybook/addon-actions';


const meta: Meta<typeof Task> = {
  title: 'Task',
  component: Task,
  argTypes: {
    deleteTask: { action: 'deleted' },
    getSingleTask: { action: 'edited' },
    setToComplete: { action: 'completed' },
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

const defaultTask: TaskProps['task'] = {
  _id: '1',
  title: 'Sample Task',
  completed: false,
  createdAt: '2024-08-01T12:34:56Z',
  updatedAt: '2024-08-01T12:34:56Z',
};

export const Uncompleted: Story = {
  args: {
    task: defaultTask,
    index: 0,
    deleteTask: action('deleteTask'),
    getSingleTask: action('getSingleTask'),
    setToComplete: action('setToComplete'),
  },
};

export const Completed: Story = {
  args: {
    task: {
      ...defaultTask,
      completed: true,
    },
    index: 0,
    deleteTask: action('deleteTask'),
    getSingleTask: action('getSingleTask'),
    setToComplete: action('setToComplete'),
  },
};
