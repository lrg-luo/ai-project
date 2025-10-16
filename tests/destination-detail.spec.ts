import { test, expect } from '@playwright/test'

test.describe('Destination Detail Page', () => {
  test('should navigate to detail page when clicking view details button', async ({ page }) => {
    // Navigate to home page
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h2:has-text("热门目的地")')
    
    // Find the first destination card and click "查看详情" button
    const firstCard = page.locator('.bg-white.rounded-lg.shadow-lg').first()
    await expect(firstCard).toBeVisible()
    
    // Get the destination name before clicking
    const destinationName = await firstCard.locator('h3').textContent()
    
    // Click the "查看详情" button
    await firstCard.locator('button:has-text("查看详情")').click()
    
    // Wait for navigation to complete
    await page.waitForURL(/\/destination\/\d+/)
    
    // Verify we're on the detail page
    expect(page.url()).toMatch(/\/destination\/\d+/)
    
    // Verify the destination name is displayed on the detail page
    const detailPageTitle = page.locator('h1')
    await expect(detailPageTitle).toBeVisible()
    await expect(detailPageTitle).toContainText(destinationName || '')
  })

  test('should display all detail page sections', async ({ page }) => {
    // Navigate directly to a destination detail page (ID 1 - 马尔代夫)
    await page.goto('/destination/1')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Verify hero section with image
    await expect(page.locator('section.relative.h-96')).toBeVisible()
    
    // Verify destination name
    await expect(page.locator('h1:has-text("马尔代夫")')).toBeVisible()
    
    // Verify location
    await expect(page.locator('text=印度洋')).toBeVisible()
    
    // Verify description section
    await expect(page.locator('h2:has-text("目的地介绍")')).toBeVisible()
    
    // Verify included items section
    await expect(page.locator('h2:has-text("套餐包含")')).toBeVisible()
    
    // Verify itinerary section
    await expect(page.locator('h2:has-text("行程安排")')).toBeVisible()
    
    // Verify booking card on the right side
    await expect(page.locator('text=起价')).toBeVisible()
    await expect(page.locator('button:has-text("立即预订")')).toBeVisible()
    await expect(page.locator('button:has-text("返回首页")')).toBeVisible()
  })

  test('should navigate to booking page when clicking book button', async ({ page }) => {
    // Navigate to a destination detail page
    await page.goto('/destination/2')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Click the "立即预订" button
    await page.locator('button:has-text("立即预订")').first().click()
    
    // Wait for navigation to booking page
    await page.waitForURL(/\/booking\/2/)
    
    // Verify we're on the booking page
    expect(page.url()).toContain('/booking/2')
  })

  test('should navigate back to home page when clicking return button', async ({ page }) => {
    // Navigate to a destination detail page
    await page.goto('/destination/3')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Click the "返回首页" button
    await page.locator('button:has-text("返回首页")').click()
    
    // Wait for navigation to home page
    await page.waitForURL('/')
    
    // Verify we're on the home page
    expect(page.url()).toBe('http://localhost:5173/')
  })

  test('should show not found message for invalid destination ID', async ({ page }) => {
    // Navigate to a non-existent destination
    await page.goto('/destination/9999')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Verify "not found" message is displayed
    await expect(page.locator('h2:has-text("目的地未找到")')).toBeVisible()
    await expect(page.locator('text=抱歉，我们找不到您要查看的目的地')).toBeVisible()
    
    // Verify return to home button is present
    await expect(page.locator('button:has-text("返回首页")')).toBeVisible()
  })

  test('should display image gallery with navigation dots', async ({ page }) => {
    // Navigate to a destination with multiple images (ID 1 - 马尔代夫 has 3 images)
    await page.goto('/destination/1')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Verify main image is displayed
    const mainImage = page.locator('section.relative.h-96 img').first()
    await expect(mainImage).toBeVisible()
    
    // Verify navigation dots are present (should be 3 for 马尔代夫)
    const navDots = page.locator('button[aria-label^="查看图片"]')
    await expect(navDots).toHaveCount(3)
    
    // Click the second dot
    await navDots.nth(1).click()
    
    // Wait a bit for the image to change
    await page.waitForTimeout(500)
    
    // The active dot should have the "bg-white w-8" class
    const activeDot = page.locator('button.bg-white.w-8')
    await expect(activeDot).toBeVisible()
  })

  test('should display rating and review count', async ({ page }) => {
    // Navigate to destination detail page
    await page.goto('/destination/1')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Verify rating is displayed
    const rating = page.locator('text=/4\\.\\d+ \\(\\d+ 评价\\)/')
    await expect(rating).toBeVisible()
  })

  test('should display itinerary with activities', async ({ page }) => {
    // Navigate to destination detail page
    await page.goto('/destination/1')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Verify itinerary items are displayed
    await expect(page.locator('text=第1天:')).toBeVisible()
    
    // Verify activities are listed
    const activities = page.locator('li:has-text("机场接机")')
    await expect(activities).toBeVisible()
  })
})
