import { ContentType } from '@models/chat.model';
import { render } from '@testing-library/react';
import { UserMessage } from '../UserMessage/UserMessage';

const messageMock = {
    username: 'username',
    owner: 'username',
    content: { type: 'text' as ContentType, value: 'something value' },
    sendDate: '23.02.2023',
};

describe('Testing message components set', () => {
    
    test('Should render owner UserMessage component', () => {
        const { container } = render(<UserMessage {...messageMock} />);
        const isOwner = container.querySelector('.message')?.classList.contains('owner');
        expect(container).toMatchSnapshot();
        expect(isOwner).toBe(true);
    });

    test('Should render not owner UserMessage component', () => {
        messageMock.username = 'notusername'
        const { container } = render(<UserMessage {...messageMock} />);
        const isOwner = container.querySelector('.message')?.classList.contains('owner');
        expect(container).toMatchSnapshot();
        expect(isOwner).toBe(false);
    })
});
