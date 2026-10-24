# Store category corrections — review only

Status: **Proposal only. Do not run against production until approved.**

This proposal corrects eight clearly mismatched product categories in Supabase `public.products`. It does not change product names, prices, links, affiliate tags, or images.

## Proposed changes

| Product | Current category | Proposed category | Product ID |
|---|---|---|---|
| iBUYPOWER Trace Gaming Desktop | CPUs | Gaming PCs | `e25d76b6-3120-4118-af99-a46d3b71fcfe` |
| ASUS Dual NVIDIA GeForce RTX 5060 Ti 16GB | Gaming | Graphics Cards | `1af8f2dd-ab66-4f90-b6a3-6f6f71d797f7` |
| ASUS ROG Strix B850-G motherboard | Gaming | Motherboards | `177ce979-b88b-4952-a6a4-3025c2294996` |
| CORSAIR CLIPPER PRO MINI 60 keyboard | Gaming | Keyboards | `25f172c2-c6e7-4561-938c-0be300659e11` |
| Premium Wireless Bluetooth mouse | Gaming | Mice | `e9831745-0c5b-43b9-8cf9-d9393d25fbbd` |
| Thermalright Peerless Assassin 120 SE CPU cooler | Gaming | PC Cooling | `e318afbc-57bf-455a-a88c-e8f966e3b2ad` |
| ASUS ROG Xbox Ally X Gaming Handheld | Gaming Accessories | Gaming Handhelds | `8104c55f-6203-423a-9de9-cbf3496501b8` |
| NVIDIA GeForce RTX 5070 12GB graphics card | Gaming Accessories | Graphics Cards | `29c0a072-b05b-4bab-ad4f-34787de9d739` |

## Proposed SQL (not executed)

Run only after approval, and only after rechecking the current category values. Each update is guarded by both the product ID and expected old category.

```sql
BEGIN;

UPDATE public.products SET category = 'Gaming PCs'
WHERE id = 'e25d76b6-3120-4118-af99-a46d3b71fcfe' AND category = 'CPUs';

UPDATE public.products SET category = 'Graphics Cards'
WHERE id = '1af8f2dd-ab66-4f90-b6a3-6f6f71d797f7' AND category = 'Gaming';

UPDATE public.products SET category = 'Motherboards'
WHERE id = '177ce979-b88b-4952-a6a4-3025c2294996' AND category = 'Gaming';

UPDATE public.products SET category = 'Keyboards'
WHERE id = '25f172c2-c6e7-4561-938c-0be300659e11' AND category = 'Gaming';

UPDATE public.products SET category = 'Mice'
WHERE id = 'e9831745-0c5b-43b9-8cf9-d9393d25fbbd' AND category = 'Gaming';

UPDATE public.products SET category = 'PC Cooling'
WHERE id = 'e318afbc-57bf-455a-a88c-e8f966e3b2ad' AND category = 'Gaming';

UPDATE public.products SET category = 'Gaming Handhelds'
WHERE id = '8104c55f-6203-423a-9de9-cbf3496501b8' AND category = 'Gaming Accessories';

UPDATE public.products SET category = 'Graphics Cards'
WHERE id = '29c0a072-b05b-4bab-ad4f-34787de9d739' AND category = 'Gaming Accessories';

-- Before COMMIT, verify all eight rows changed exactly as intended.
-- If any expected row did not update, ROLLBACK and investigate.
COMMIT;
```

Important: the guarded updates prevent changing rows whose category has changed since this proposal was prepared, but they do not automatically fail the whole transaction if a row count is zero. Verify each row count and resulting category before committing. This file is documentation only and does not run automatically.

## Safety and follow-up

- No database rows have been changed.
- No merchant links, prices, or affiliate attribution have been changed.
- Merchant-link verification remains a separate task.
- After any approved database update, verify the live Store category filters and the eight product cards.
