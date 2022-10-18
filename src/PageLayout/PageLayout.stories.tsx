import React from 'react'
import {Meta, Story} from '@storybook/react'
import {Box, BranchName, Heading, Link, StateLabel, TabNav, Text} from '..'
import {Placeholder} from '../Placeholder'
import {PageLayout} from './PageLayout'

const meta: Meta = {
  title: 'Components/PageLayout',
  parameters: {
    layout: 'fullscreen',
    controls: {expanded: true}
  },
  args: {
    // Debug controls
    'Render header?': true,
    'Render pane?': true,
    'Render footer?': true,
    'Header placeholder height': 64,
    'Pane placeholder height': 200,
    'Content placeholder height': 400,
    'Footer placeholder height': 64,
    containerWidth: 'xlarge',
    padding: 'normal',
    rowGap: 'normal',
    columnGap: 'normal',
    'Header.divider.regular': 'none',
    'Header.divider.narrow': 'none',
    'Header.divider.wide': 'none',
    'Header.padding': 'none',
    'Header.hidden.regular': false,
    'Header.hidden.narrow': false,
    'Header.hidden.wide': false,
    'Content.width': 'full',
    'Content.padding': 'none',
    'Content.hidden.regular': false,
    'Content.hidden.narrow': false,
    'Content.hidden.wide': false,
    'Pane.position.regular': 'end',
    'Pane.position.narrow': 'end',
    'Pane.position.wide': 'end',
    'Pane.width': 'medium',
    'Pane.sticky': false,
    'Pane.padding': 'none',
    'Pane.divider.regular': 'none',
    'Pane.divider.narrow': 'none',
    'Pane.divider.wide': 'none',
    'Footer.divider.regular': 'none',
    'Footer.divider.narrow': 'none',
    'Footer.divider.wide': 'none',
    'Footer.padding': 'none',
    'Footer.hidden.regular': false,
    'Footer.hidden.narrow': false,
    'Footer.hidden.wide': false
  },
  argTypes: {
    // Debug controls
    'Render header?': {
      type: 'boolean',
      table: {category: 'Debug'}
    },
    'Render pane?': {
      type: 'boolean',
      table: {category: 'Debug'}
    },
    'Render footer?': {
      type: 'boolean',
      table: {category: 'Debug'}
    },
    'Header placeholder height': {
      type: 'number',
      table: {category: 'Debug'}
    },
    'Pane placeholder height': {
      type: 'number',
      table: {category: 'Debug'}
    },
    'Content placeholder height': {
      type: 'number',
      table: {category: 'Debug'}
    },
    'Footer placeholder height': {
      type: 'number',
      table: {category: 'Debug'}
    },

    // PageLayout prop controls
    containerWidth: {
      type: {
        name: 'enum',
        value: ['full', 'medium', 'large', 'xlarge']
      },
      control: {type: 'radio'},
      table: {category: 'PageLayout props'}
    },
    padding: {
      type: {
        name: 'enum',
        value: ['none', 'condensed', 'normal']
      },
      control: {type: 'radio'},
      table: {category: 'PageLayout props'}
    },
    rowGap: {
      type: {
        name: 'enum',
        value: ['none', 'condensed', 'normal']
      },
      control: {type: 'radio'},
      table: {category: 'PageLayout props'}
    },
    columnGap: {
      type: {
        name: 'enum',
        value: ['none', 'condensed', 'normal']
      },
      control: {type: 'radio'},
      table: {category: 'PageLayout props'}
    },

    // Header prop controls
    'Header.divider.regular': {
      type: {
        name: 'enum',
        value: ['none', 'line']
      },
      control: {
        type: 'radio'
      },
      table: {
        category: 'Header props'
      }
    },
    'Header.divider.narrow': {
      type: {
        name: 'enum',
        value: ['none', 'line', 'filled']
      },
      control: {
        type: 'radio'
      },
      table: {
        category: 'Header props'
      }
    },
    'Header.divider.wide': {
      type: {
        name: 'enum',
        value: ['none', 'line']
      },
      control: {
        type: 'radio'
      },
      table: {
        category: 'Header props'
      }
    },
    'Header.padding': {
      type: {
        name: 'enum',
        value: ['none', 'condensed', 'normal']
      },
      control: {type: 'radio'},
      table: {category: 'Header props'}
    },
    'Header.hidden.regular': {
      type: 'boolean',
      table: {category: 'Header props'}
    },
    'Header.hidden.narrow': {
      type: 'boolean',
      table: {category: 'Header props'}
    },
    'Header.hidden.wide': {
      type: 'boolean',
      table: {category: 'Header props'}
    },

    // Content prop controls
    'Content.width': {
      type: {
        name: 'enum',
        value: ['full', 'medium', 'large', 'xlarge']
      },
      control: {type: 'radio'},
      table: {category: 'Content props'}
    },
    'Content.padding': {
      type: {
        name: 'enum',
        value: ['none', 'condensed', 'normal']
      },
      control: {type: 'radio'},
      table: {category: 'Content props'}
    },
    'Content.hidden.regular': {
      type: 'boolean',
      table: {category: 'Content props'}
    },
    'Content.hidden.narrow': {
      type: 'boolean',
      table: {category: 'Content props'}
    },
    'Content.hidden.wide': {
      type: 'boolean',
      table: {category: 'Content props'}
    },

    // Pane prop controls
    'Pane.position.regular': {
      type: {
        name: 'enum',
        value: ['start', 'end']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },
    'Pane.position.narrow': {
      type: {
        name: 'enum',
        value: ['start', 'end']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },
    'Pane.position.wide': {
      type: {
        name: 'enum',
        value: ['start', 'end']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },
    'Pane.width': {
      type: {
        name: 'enum',
        value: ['small', 'medium', 'large']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },
    'Pane.sticky': {
      type: 'boolean',
      table: {category: 'Pane props'}
    },
    'Pane.padding': {
      type: {
        name: 'enum',
        value: ['none', 'condensed', 'normal']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },
    'Pane.divider.regular': {
      type: {
        name: 'enum',
        value: ['none', 'line']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },
    'Pane.divider.narrow': {
      type: {
        name: 'enum',
        value: ['none', 'line', 'filled']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },
    'Pane.divider.wide': {
      type: {
        name: 'enum',
        value: ['none', 'line']
      },
      control: {type: 'radio'},
      table: {category: 'Pane props'}
    },

    // Footer prop controls
    'Footer.divider.regular': {
      type: {
        name: 'enum',
        value: ['none', 'line']
      },
      control: {
        type: 'radio'
      },
      table: {
        category: 'Footer props'
      }
    },
    'Footer.divider.narrow': {
      type: {
        name: 'enum',
        value: ['none', 'line', 'filled']
      },
      control: {
        type: 'radio'
      },
      table: {
        category: 'Footer props'
      }
    },
    'Footer.divider.wide': {
      type: {
        name: 'enum',
        value: ['none', 'line']
      },
      control: {
        type: 'radio'
      },
      table: {
        category: 'Footer props'
      }
    },
    'Footer.padding': {
      type: {
        name: 'enum',
        value: ['none', 'condensed', 'normal']
      },
      control: {type: 'radio'},
      table: {category: 'Footer props'}
    },
    'Footer.hidden.regular': {
      type: 'boolean',
      table: {category: 'Footer props'}
    },
    'Footer.hidden.narrow': {
      type: 'boolean',
      table: {category: 'Footer props'}
    },
    'Footer.hidden.wide': {
      type: 'boolean',
      table: {category: 'Footer props'}
    }
  }
}

const Template: Story = args => (
  <PageLayout
    containerWidth={args.containerWidth}
    padding={args.padding}
    rowGap={args.rowGap}
    columnGap={args.columnGap}
    sx={args.sx}
  >
    {args['Render header?'] ? (
      <PageLayout.Header
        padding={args['Header.padding']}
        divider={{
          narrow: args['Header.divider.narrow'],
          regular: args['Header.divider.regular'],
          wide: args['Header.divider.wide']
        }}
        hidden={{
          narrow: args['Header.hidden.narrow'],
          regular: args['Header.hidden.regular'],
          wide: args['Header.hidden.wide']
        }}
      >
        <Placeholder height={args['Header placeholder height']} label="Header" />
      </PageLayout.Header>
    ) : null}
    <PageLayout.Content
      width={args['Content.width']}
      padding={args['Content.padding']}
      hidden={{
        narrow: args['Content.hidden.narrow'],
        regular: args['Content.hidden.regular'],
        wide: args['Content.hidden.wide']
      }}
    >
      <Placeholder height={args['Content placeholder height']} label="Content" />
    </PageLayout.Content>
    {args['Render pane?'] ? (
      <PageLayout.Pane
        position={{
          narrow: args['Pane.position.narrow'],
          regular: args['Pane.position.regular'],
          wide: args['Pane.position.wide']
        }}
        width={args['Pane.width']}
        sticky={args['Pane.sticky']}
        padding={args['Pane.padding']}
        divider={{
          narrow: args['Pane.divider.narrow'],
          regular: args['Pane.divider.regular'],
          wide: args['Pane.divider.wide']
        }}
        hidden={{
          narrow: args['Pane.hidden.narrow'],
          regular: args['Pane.hidden.regular'],
          wide: args['Pane.hidden.wide']
        }}
      >
        <Placeholder height={args['Pane placeholder height']} label="Pane" />
      </PageLayout.Pane>
    ) : null}
    {args['Render footer?'] ? (
      <PageLayout.Footer
        padding={args['Footer.padding']}
        divider={{
          narrow: args['Footer.divider.narrow'],
          regular: args['Footer.divider.regular'],
          wide: args['Footer.divider.wide']
        }}
        hidden={{
          narrow: args['Footer.hidden.narrow'],
          regular: args['Footer.hidden.regular'],
          wide: args['Footer.hidden.wide']
        }}
      >
        <Placeholder height={args['Footer placeholder height']} label="Footer" />
      </PageLayout.Footer>
    ) : null}
  </PageLayout>
)

export const Default = Template.bind({})

export const PullRequestPage = () => (
  <PageLayout>
    <PageLayout.Header>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Box>
          <Heading as="h1" sx={{fontWeight: 'normal'}}>
            Input validation styles <Text sx={{color: 'fg.muted', fontWeight: 'light'}}>#1831</Text>
          </Heading>
          <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <StateLabel status="pullOpened">Open</StateLabel>
            <Text sx={{fontSize: 1, color: 'fg.muted'}}>
              <Link href="#" muted sx={{fontWeight: 'bold'}}>
                mperrotti
              </Link>{' '}
              wants to merge 3 commits into <BranchName href="#">main</BranchName> from{' '}
              <BranchName href="#">mp/validation-styles</BranchName>
            </Text>
          </Box>
        </Box>
        <TabNav>
          <TabNav.Link href="#" selected>
            Conversation
          </TabNav.Link>
          <TabNav.Link href="#">Commits</TabNav.Link>
          <TabNav.Link href="#">Checks</TabNav.Link>
          <TabNav.Link href="#">Files changed</TabNav.Link>
        </TabNav>
      </Box>
    </PageLayout.Header>
    <PageLayout.Content>
      <Box sx={{border: '1px solid', borderRadius: 2, borderColor: 'border.default', height: 200}}></Box>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          border: '1px solid',
          whiteSpace: 'nowrap',
          borderColor: 'border.default',
          mt: 3,
          p: 3,
          borderRadius: 2
        }}
      >
        This box has really long content. If it is too long, it will cause x overflow and should show a scrollbar. When
        this overflows, it should not break to overall page layout!
      </Box>
    </PageLayout.Content>
    <PageLayout.Pane>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Box>
          <Text sx={{fontSize: 0, fontWeight: 'bold', display: 'block', color: 'fg.muted'}}>Assignees</Text>
          <Text sx={{fontSize: 0, color: 'fg.muted', lineHeight: 'condensed'}}>
            No one –{' '}
            <Link href="#" muted>
              assign yourself
            </Link>
          </Text>
        </Box>
        <Box role="separator" sx={{width: '100%', height: 1, backgroundColor: 'border.default'}}></Box>
        <Box>
          <Text sx={{fontSize: 0, fontWeight: 'bold', display: 'block', color: 'fg.muted'}}>Labels</Text>
          <Text sx={{fontSize: 0, color: 'fg.muted', lineHeight: 'condensed'}}>None yet</Text>
        </Box>
      </Box>
    </PageLayout.Pane>
  </PageLayout>
)

export const StickyPane: Story = args => (
  <PageLayout rowGap="none" columnGap="none" padding="none" containerWidth="full">
    <PageLayout.Header padding="normal" divider="line">
      <Placeholder label="Header" height={64} />
    </PageLayout.Header>
    <PageLayout.Content padding="normal" width="large">
      <Box sx={{display: 'grid', gap: 3}}>
        {Array.from({length: args.numParagraphsInContent}).map((_, i) => {
          const testId = `content${i}`
          return (
            <Box key={i} as="p" sx={{margin: 0}}>
              <span data-testid={testId}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus
                in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod
                nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.
              </span>
            </Box>
          )
        })}
      </Box>
    </PageLayout.Content>
    <PageLayout.Pane position="start" padding="normal" divider="line" sticky={args.sticky}>
      <Box sx={{display: 'grid', gap: 3}}>
        {Array.from({length: args.numParagraphsInPane}).map((_, i) => {
          const testId = `paragraph${i}`
          return (
            <Box key={i} as="p" sx={{margin: 0}}>
              <span data-testid={testId}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus.
              </span>
            </Box>
          )
        })}
      </Box>
    </PageLayout.Pane>
    <PageLayout.Footer padding="normal" divider="line">
      <Placeholder label="Footer" height={64} />
    </PageLayout.Footer>
  </PageLayout>
)

StickyPane.args = {
  sticky: true,
  numParagraphsInPane: 10,
  numParagraphsInContent: 30
}

StickyPane.argTypes = {
  sticky: {
    type: 'boolean'
  },
  numParagraphsInPane: {
    type: 'number'
  },
  numParagraphsInContent: {
    type: 'number'
  }
}

export const NestedScrollContainer: Story = args => (
  <Box sx={{display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100vh'}}>
    <Placeholder label="Above scroll container" height={120} />
    <Box sx={{overflow: 'auto'}}>
      <PageLayout rowGap="none" columnGap="none" padding="none" containerWidth="full">
        <PageLayout.Header padding="normal" divider="line">
          <Placeholder label="Header" height={64} />
        </PageLayout.Header>
        <PageLayout.Content padding="normal" width="large">
          <Box sx={{display: 'grid', gap: 3}}>
            {Array.from({length: args.numParagraphsInContent}).map((_, i) => (
              <Box key={i} as="p" sx={{margin: 0}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus
                in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod
                nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.
              </Box>
            ))}
          </Box>
        </PageLayout.Content>
        <PageLayout.Pane position="start" padding="normal" divider="line" sticky>
          <Box sx={{display: 'grid', gap: 3}}>
            {Array.from({length: args.numParagraphsInPane}).map((_, i) => (
              <Box key={i} as="p" sx={{margin: 0}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus.
              </Box>
            ))}
          </Box>
        </PageLayout.Pane>
        <PageLayout.Footer padding="normal" divider="line">
          <Placeholder label="Footer" height={64} />
        </PageLayout.Footer>
      </PageLayout>
    </Box>
    <Placeholder label="Below scroll container" height={120} />
  </Box>
)

NestedScrollContainer.args = {
  numParagraphsInPane: 10,
  numParagraphsInContent: 30
}

NestedScrollContainer.argTypes = {
  numParagraphsInPane: {
    type: 'number'
  },
  numParagraphsInContent: {
    type: 'number'
  }
}

export const CustomStickyHeader: Story = args => (
  // a box to create a sticky top element that will be on the consumer side and outside of the PageLayout component
  <Box data-testid="story-window">
    <Box
      as="header"
      data-testid="sticky-header"
      sx={{
        position: 'sticky',
        top: 0,
        height: args.offsetHeader,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'canvas.subtle',
        borderBottom: '1px solid',
        borderColor: 'border.default',
        zIndex: 100
      }}
    >
      Custom sticky header
    </Box>
    <PageLayout rowGap="none" columnGap="none" padding="none" containerWidth="full">
      <PageLayout.Content padding="normal" width="large">
        <Box sx={{display: 'grid', gap: 3}} data-testid="scrollContainer">
          {Array.from({length: args.numParagraphsInContent}).map((_, i) => {
            const testId = `content${i}`
            return (
              <Box key={i} as="p" sx={{margin: 0}}>
                <span data-testid={testId}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae orci et magna consectetur
                  ullamcorper eget ac purus. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante
                  quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec
                  pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem
                  lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut
                  blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam
                  tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.
                </span>
              </Box>
            )
          })}
        </Box>
      </PageLayout.Content>
      <PageLayout.Pane position="start" padding="normal" divider="line" sticky offsetHeader={args.offsetHeader}>
        <Box sx={{display: 'grid', gap: 3}}>
          {Array.from({length: args.numParagraphsInPane}).map((_, i) => {
            const testId = `paragraph${i}`
            return (
              <Box key={i} as="p" sx={{margin: 0}}>
                <span data-testid={testId}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                  ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius
                  tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec
                  sit amet massa purus.
                </span>
              </Box>
            )
          })}
        </Box>
      </PageLayout.Pane>
      <PageLayout.Footer padding="normal" divider="line">
        <Placeholder label="Footer" height={64} />
      </PageLayout.Footer>
    </PageLayout>
  </Box>
)

CustomStickyHeader.args = {
  sticky: true,
  offsetHeader: '8rem',
  numParagraphsInPane: 10,
  numParagraphsInContent: 30
}

CustomStickyHeader.argTypes = {
  sticky: {
    type: 'boolean'
  },
  offsetHeader: {
    type: 'string'
  },
  numParagraphsInPane: {
    type: 'number'
  },
  numParagraphsInContent: {
    type: 'number'
  }
}

export const ResizablePane: Story = args => (
  <PageLayout containerWidth="full" padding={args.padding} rowGap={args.rowGap} columnGap={args.columnGap}>
    {args['Render header?'] ? (
      <PageLayout.Header
        padding={args['Header.padding']}
        divider={{
          narrow: args['Header.divider.narrow'],
          regular: args['Header.divider.regular'],
          wide: args['Header.divider.wide']
        }}
        hidden={{
          narrow: args['Header.hidden.narrow'],
          regular: args['Header.hidden.regular'],
          wide: args['Header.hidden.wide']
        }}
      >
        <Placeholder height={args['Header placeholder height']} label="Header" />
      </PageLayout.Header>
    ) : null}
    <PageLayout.Content
      width={args['Content.width']}
      padding={args['Content.padding']}
      hidden={{
        narrow: args['Content.hidden.narrow'],
        regular: args['Content.hidden.regular'],
        wide: args['Content.hidden.wide']
      }}
    >
      <Placeholder height={args['Content placeholder height']} label="Content" />
    </PageLayout.Content>
    {args['Render pane?'] ? (
      <PageLayout.Pane
        width={args['Content.width']}
        padding={args['Content.padding']}
        position={{
          narrow: args['Pane.position.narrow'],
          regular: args['Pane.position.regular'],
          wide: args['Pane.position.wide']
        }}
        divider={{
          narrow: args['Pane.divider.narrow'],
          regular: args['Pane.divider.regular'],
          wide: args['Pane.divider.wide']
        }}
        resizable={true}
        widthStorageKey="primer-react.pane-width"
      >
        <Placeholder height={args['Pane placeholder height']} label="Pane" />
      </PageLayout.Pane>
    ) : null}
    {args['Render footer?'] ? (
      <PageLayout.Footer
        padding={args['Footer.padding']}
        divider={{
          narrow: args['Footer.divider.narrow'],
          regular: args['Footer.divider.regular'],
          wide: args['Footer.divider.wide']
        }}
        hidden={{
          narrow: args['Footer.hidden.narrow'],
          regular: args['Footer.hidden.regular'],
          wide: args['Footer.hidden.wide']
        }}
      >
        <Placeholder height={args['Footer placeholder height']} label="Footer" />
      </PageLayout.Footer>
    ) : null}
  </PageLayout>
)

ResizablePane.args = {
  padding: 1,
  rowGap: 1,
  columnGap: 1
}

ResizablePane.argTypes = {
  padding: {
    type: {
      name: 'enum',
      value: ['none', 'condensed', 'normal']
    }
  },
  rowGap: {
    type: {
      name: 'enum',
      value: ['none', 'condensed', 'normal']
    }
  },
  columnGap: {
    type: {
      name: 'enum',
      value: ['none', 'condensed', 'normal']
    }
  }
}

export default meta
