import { describe, it, expect } from 'vitest';
import { LocalCMSProvider } from '../../cms/localProvider';

describe('LocalCMSProvider', () => {
  it('loads default hero data and stats', async () => {
    const provider = new LocalCMSProvider();
    const hero = await provider.getHero();
    expect(hero).toBeDefined();

    const stats = await provider.getStats();
    expect(stats.length).toBeGreaterThan(0);
  });

  it('updates hero data and persists changes', async () => {
    const provider = new LocalCMSProvider();
    const originalHero = await provider.getHero();

    await provider.updateHero({
      ...originalHero,
      headline: 'Test Updated Headline'
    });

    const updatedHero = await provider.getHero();
    expect(updatedHero.headline).toBe('Test Updated Headline');
  });

  it('retrieves projects and verifies password', async () => {
    const provider = new LocalCMSProvider();
    const projects = await provider.getProjects();
    expect(projects.length).toBeGreaterThan(0);

    const protectedProject = projects.find((p) => p.isPasswordProtected);
    if (protectedProject) {
      const valid = await provider.verifyProjectPassword(
        protectedProject.id,
        protectedProject.passwordHash || ''
      );
      expect(valid).toBe(true);
    }
  });
});
