/**
 * This is the place where we keep components that are not part of the public
 * api yet (not in main bundle). We don't recommend using it in production.
 *
 * But, they are published on npm and you can import them for experimentation/feedback.
 * example: import {ActionList} from '@primer/react/drafts
 */

export {DataTable, Table} from '../DataTable'
export type {
  DataTableProps,
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableHeaderProps,
  TableCellProps,
  TableContainerProps,
  TableTitleProps,
  TableSubtitleProps,
  TableActionsProps,
} from '../DataTable'

export * from '../Dialogv2/Dialog'

export * from '../Hidden'

export {default as InlineAutocomplete} from './InlineAutocomplete'
export type {
  InlineAutocompleteProps,
  ShowSuggestionsEvent,
  Suggestion,
  Suggestions,
  Trigger,
} from './InlineAutocomplete'

export {default as MarkdownViewer} from './MarkdownViewer'
export type {MarkdownViewerProps, InteractiveMarkdownViewerProps} from './MarkdownViewer'

export {default as MarkdownEditor} from './MarkdownEditor'
export * from './MarkdownEditor'

export * from '../UnderlineNav2'

export * from '../PageHeader'
export {default as Hidden} from '../Hidden'

export * from './hooks'

// TODO: Remove these components from the drafts bundle in the next major release
export * from '../TreeView'
export * from '../NavList'
export * from '../SegmentedControl'
export * from '../SplitPageLayout'
