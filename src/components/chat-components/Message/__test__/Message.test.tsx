import { ContentType } from '@models/chat.model';
import { render, screen } from '@testing-library/react';
import { UserMessage } from '../UserMessage/Message';

const messageMock = {
    username: 'username',
    owner: 'usename',
    content: { type: 'text' as ContentType, value: 'something value' },
    sendDate: '23.02.2023',
};

describe('Testing message components set', () => {
    render(<UserMessage {...messageMock} />);
    test('Should render UserMessage component', () => {
        const textElement = screen.getByText(messageMock.sendDate);
        expect(textElement).toBeInTheDocument();
    });
});
