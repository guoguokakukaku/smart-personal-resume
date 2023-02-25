import HeaderView from '.'
import { HEADER_TYPE } from '../../util/common'

import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Components/HeaderView',
  component: HeaderView,
  // todo argTypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  parameters: {
    layout: 'padded',// default value (centered | fullscreen | padded)
  },
} as ComponentMeta<typeof HeaderView>

const Template: ComponentStory<typeof HeaderView> = (args) => <HeaderView {...args} />

export const Top = Template.bind({})
Top.args = {
  type: HEADER_TYPE.TOP,
  title: '次世代経歴書',
  actionFuncs: [],
}

export const Search = Template.bind({})
Search.args = {
  ...Top.args,
  type: HEADER_TYPE.SEARCH,
}

export const Common = Template.bind({})
Common.args = {
  ...Top.args,
  type: HEADER_TYPE.COMMON,
}