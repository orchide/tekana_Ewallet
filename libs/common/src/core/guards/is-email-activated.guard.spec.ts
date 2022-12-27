import { IsEmailActivatedGuard } from './is-email-activated.guard';

describe('IsEmailActivatedGuard', () => {
  it('should be defined', () => {
    expect(new IsEmailActivatedGuard()).toBeDefined();
  });
});
