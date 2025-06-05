import { mockAnalyzeMessage } from '../server/services/analyzerService';

describe('mockAnalyzeMessage', () => {
  it('returns high priority for emergency keywords', () => {
    const message = "There is a gas leak in the basement!";
    const result = mockAnalyzeMessage(message);

    expect(result.priority).toBe("high");
    expect(result.keywords).toContain("gas");
  });

  it('returns low priority for cosmetic issues', () => {
    const message = "The wall has chipped paint";
    const result = mockAnalyzeMessage(message);

    expect(result.priority).toBe("low");
    expect(result.keywords).toContain("chipped paint");
  });
});
