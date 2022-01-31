import React from 'react'
import * as primerComponents from '@primer/react'
import * as drafts from '@primer/react/drafts'
import * as doctocatComponents from '@primer/gatsby-theme-doctocat'
import {
  CheckIcon,
  ZapIcon,
  XIcon,
  SearchIcon,
  DotIcon,
  OctofaceIcon,
  PersonIcon,
  MailIcon,
  GitCommitIcon,
  FlameIcon,
  MarkGithubIcon,
  NoteIcon,
  ProjectIcon,
  FilterIcon,
  GearIcon,
  TypographyIcon,
  VersionsIcon,
  LinkIcon,
  LawIcon,
  StarIcon,
  AlertIcon,
  ArrowRightIcon,
  KebabHorizontalIcon,
  PencilIcon,
  ArchiveIcon,
  TrashIcon,
  CalendarIcon,
  IterationsIcon,
  NumberIcon,
  SingleSelectIcon
} from '@primer/octicons-react'
import State from '../../../components/State'
import {Dialog as Dialog2} from '../../../../src/Dialog/Dialog'
import {AnchoredOverlay} from '../../../../src/AnchoredOverlay'
import {ConfirmationDialog, useConfirm} from '../../../../src/Dialog/ConfirmationDialog'
import {SelectPanel} from '../../../../src/SelectPanel/SelectPanel'

const ReactRouterLink = ({to, ...props}) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={to} {...props} />
}

export default {
  ...doctocatComponents,
  ...primerComponents,
  ...(metastring.includes('drafts') ? drafts : {}),
  ReactRouterLink,
  State,
  CheckIcon,
  SearchIcon,
  ZapIcon,
  XIcon,
  DotIcon,
  OctofaceIcon,
  PersonIcon,
  MailIcon,
  GitCommitIcon,
  FlameIcon,
  MarkGithubIcon,
  NoteIcon,
  ProjectIcon,
  FilterIcon,
  GearIcon,
  TypographyIcon,
  VersionsIcon,
  LinkIcon,
  LawIcon,
  StarIcon,
  AlertIcon,
  ArrowRightIcon,
  KebabHorizontalIcon,
  PencilIcon,
  ArchiveIcon,
  TrashIcon,
  CalendarIcon,
  IterationsIcon,
  NumberIcon,
  SingleSelectIcon,
  Dialog2,
  ConfirmationDialog,
  useConfirm,
  AnchoredOverlay,
  SelectPanel
}
