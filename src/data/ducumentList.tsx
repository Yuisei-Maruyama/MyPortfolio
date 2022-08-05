import React from 'react'
import { v4 as uuid } from 'uuid'
import { DocumentItem } from '@/types'

export const ducumentList = (
  previewDocument: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
): DocumentItem[] => {
  return [
    {
      id: uuid(),
      label: 'Front-End',
      children: [
        {
          id: uuid(),
          label: 'README',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'CSS(Tips)',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'ComponentArchitecture',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'React',
          children: [
            {
              id: uuid(),
              label: 'Environment',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'Basics',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'PerformanceTuning',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'Props(React)',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'React Hooks',
              children: [
                {
                  id: uuid(),
                  label: 'useState',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
                {
                  id: uuid(),
                  label: 'useEffect',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
                {
                  id: uuid(),
                  label: 'useContext',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
                {
                  id: uuid(),
                  label: 'useCallback',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
                {
                  id: uuid(),
                  label: 'useMemo',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
              ],
            },
            {
              id: uuid(),
              label: 'react-router-dom',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'styled-components',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'MaterialUI',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'NextJS',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'SSG&SSR',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
          ],
        },
        {
          id: uuid(),
          label: 'Vue',
          children: [
            {
              id: uuid(),
              label: 'Tips(Vue)',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'CompositionAPI',
              children: [
                {
                  id: uuid(),
                  label: 'Props(Vue)',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
                {
                  id: uuid(),
                  label: 'Emit',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
                {
                  id: uuid(),
                  label: 'Two-Way Binding',
                  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
                },
              ],
            },
            {
              id: uuid(),
              label: 'Provide&Inject',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
            {
              id: uuid(),
              label: 'NuxtJS',
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
            },
          ],
        },
      ],
    },
    {
      id: uuid(),
      label: 'Back-End',
      children: [
        {
          id: uuid(),
          label: 'NodeJs',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'OpenAPI',
        },
      ],
    },
    {
      id: uuid(),
      label: 'TypeScript',
      children: [
        {
          id: uuid(),
          label: 'Tips(JavaScript)',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'types-cheat-sheet',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
      ],
    },
    {
      id: uuid(),
      label: 'Knowledge',
      children: [
        {
          id: uuid(),
          label: 'Accessibility',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'Commands',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'Mermaid',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
        {
          id: uuid(),
          label: 'Web-View',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
      ],
    },
    {
      id: uuid(),
      label: 'Web3',
      children: [
        {
          id: uuid(),
          label: 'Metaverse',
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e),
        },
      ],
    },
  ]
}
