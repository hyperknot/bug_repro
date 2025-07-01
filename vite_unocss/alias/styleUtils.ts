import * as stylex from '@stylexjs/stylex'

interface StylexProps {
  className?: string | null
  style?: { readonly [key: string]: string | number } | null
  'data-style-src'?: string | null
}

interface HtmlAttributes {
  class?: string
  style?: string
  'data-style-src'?: string
}

export function sx(...styles: Array<any>): HtmlAttributes {
  return attrs(stylex.props(...styles))
}

function attrs({ className, 'data-style-src': dataStyleSrc, style }: StylexProps): HtmlAttributes {
  const result: HtmlAttributes = {}

  // Convert className to class
  if (className != null && className !== '') {
    result.class = className
  }

  // Convert style object to a style string
  if (style != null && Object.keys(style).length > 0) {
    result.style = Object.keys(style)
      .map((key) => `${key}:${style[key as keyof typeof style]};`)
      .join('')
  }

  if (dataStyleSrc != null && dataStyleSrc !== '') {
    result['data-style-src'] = dataStyleSrc
  }

  return result
}
