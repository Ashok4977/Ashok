import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {SelectPanel} from '../SelectPanel'
import {ActionList, Box} from '../../../index'
import data from './mock-data'

export default {
  title: 'Drafts/Components/SelectPanel/Playground',
  component: SelectPanel,

  args: {
    title: 'Select labels',
    selectionVariant: 'multiple',
  },
  argTypes: {
    secondaryButtonText: {
      name: 'Secondary button text',
      type: 'string',
    },
  },
} as Meta<typeof SelectPanel>

export const Playground: StoryFn = args => {
  const initialSelectedLabels = [data.issue.labelIds[0]] // mock initial state: has selected labels
  const [selectedLabelIds, setSelectedLabelIds] = React.useState<string[]>(initialSelectedLabels)

  /* Selection */
  const onLabelSelect = (labelId: string) => {
    if (args.selectionVariant === 'single' || args.selectionVariant === 'instant') {
      setSelectedLabelIds([labelId])
    } else {
      if (!selectedLabelIds.includes(labelId)) setSelectedLabelIds([...selectedLabelIds, labelId])
      else setSelectedLabelIds(selectedLabelIds.filter(id => id !== labelId))
    }
  }

  const onClearSelection = () => setSelectedLabelIds([])

  const onSubmit = () => {
    data.issue.labelIds = selectedLabelIds // pretending to persist changes
  }

  /* Filtering */
  const [filteredLabels, setFilteredLabels] = React.useState(data.labels)
  const [query, setQuery] = React.useState('')

  const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const query = event.currentTarget.value
    setQuery(query)

    if (query === '') setFilteredLabels(data.labels)
    else {
      // Note: in the future, we should probably add a highlight for matching text
      setFilteredLabels(
        data.labels
          .map(label => {
            if (label.name.toLowerCase().startsWith(query)) return {priority: 1, label}
            else if (label.name.toLowerCase().includes(query)) return {priority: 2, label}
            else if (label.description?.toLowerCase().includes(query)) return {priority: 3, label}
            else return {priority: -1, label}
          })
          .filter(result => result.priority > 0)
          .map(result => result.label),
      )
    }
  }

  const sortingFn = (itemA: {id: string}, itemB: {id: string}) => {
    const initialSelectedIds = data.issue.labelIds
    if (initialSelectedIds.includes(itemA.id) && initialSelectedIds.includes(itemB.id)) return 1
    else if (initialSelectedIds.includes(itemA.id)) return -1
    else if (initialSelectedIds.includes(itemB.id)) return 1
    else return 1
  }

  const itemsToShow = query ? filteredLabels : data.labels.sort(sortingFn)

  return (
    <>
      <SelectPanel
        title={args.title}
        description={args.description}
        selectionVariant={args.selectionVariant}
        onSubmit={onSubmit}
        onClearSelection={onClearSelection}
        width={args.width}
        height={args.height}
      >
        <SelectPanel.Button>Assign label</SelectPanel.Button>

        <SelectPanel.Header>
          <SelectPanel.SearchInput onChange={onSearchInputChange} />
        </SelectPanel.Header>

        {itemsToShow.length === 0 ? (
          <SelectPanel.Message variant="empty" title={`No labels found for "${query}"`}>
            Try a different search term
          </SelectPanel.Message>
        ) : (
          <ActionList>
            {itemsToShow.map(label => (
              <ActionList.Item
                key={label.id}
                onSelect={() => onLabelSelect(label.id)}
                selected={selectedLabelIds.includes(label.id)}
              >
                <ActionList.LeadingVisual>
                  <Box
                    sx={{width: 14, height: 14, borderRadius: '100%'}}
                    style={{backgroundColor: `#${label.color}`}}
                  />
                </ActionList.LeadingVisual>
                {label.name}
                <ActionList.Description variant="block">{label.description}</ActionList.Description>
              </ActionList.Item>
            ))}
          </ActionList>
        )}

        <SelectPanel.Footer>
          {args.secondaryButtonText ? (
            <SelectPanel.SecondaryButton>{args.secondaryButtonText}</SelectPanel.SecondaryButton>
          ) : null}
        </SelectPanel.Footer>
      </SelectPanel>
    </>
  )
}
