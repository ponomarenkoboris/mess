import { render } from '@testing-library/react'
import { Header } from "../Header";

describe('Rendering Header component', () => {
    test('Check render', () => {
        const { container } = render(<Header />)
        const textElement = container.querySelector('#search__input')
        expect(textElement).toBeInTheDocument()
    })
})