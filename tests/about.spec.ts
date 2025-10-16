import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should display about page with correct content', async ({ page }) => {
    // Navigate to the about page
    await page.goto('/about')

    // Check page title
    await expect(page.locator('h1')).toContainText('关于我们')
    
    // Check hero section tagline
    await expect(page.locator('text=探索世界，发现美好')).toBeVisible()

    // Check main sections exist
    await expect(page.locator('text=我们的故事')).toBeVisible()
    await expect(page.locator('text=我们的使命')).toBeVisible()
    await expect(page.locator('text=我们的价值观')).toBeVisible()
    await expect(page.locator('text=联系我们')).toBeVisible()

    // Check mission cards
    await expect(page.locator('text=专业服务')).toBeVisible()
    await expect(page.locator('text=品质保证')).toBeVisible()
    await expect(page.locator('text=用户至上')).toBeVisible()

    // Check values
    await expect(page.locator('text=诚信为本')).toBeVisible()
    await expect(page.locator('text=创新求变')).toBeVisible()
    await expect(page.locator('text=追求卓越')).toBeVisible()

    // Check contact information
    await expect(page.locator('text=400-123-4567')).toBeVisible()
    await expect(page.locator('text=contact@explore-world.com')).toBeVisible()
    await expect(page.locator('text=北京市朝阳区旅游大厦')).toBeVisible()
  })

  test('should navigate to about page from header', async ({ page }) => {
    // Start at home page
    await page.goto('/')

    // Click on "关于我们" in the header
    await page.click('text=关于我们')

    // Wait for navigation
    await page.waitForURL('**/about')

    // Verify we're on the about page
    await expect(page.locator('h1')).toContainText('关于我们')
  })

  test('should have working header and footer', async ({ page }) => {
    await page.goto('/about')

    // Check header exists
    await expect(page.locator('header')).toBeVisible()
    
    // Check logo/brand is present
    await expect(page.locator('text=探索世界')).toBeVisible()

    // Check footer exists (by checking for common footer elements)
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/about')
    await expect(page.locator('h1')).toBeVisible()

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('h1')).toBeVisible()

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('h1')).toBeVisible()
  })
})
