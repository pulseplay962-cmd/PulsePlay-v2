# Store Product Category and Merchant-Link Review Proposal

**Status:** Review only. This document does not change product records or the live Store.
**Prepared:** 2026-10-24
**Source:** Read-only inspection of `public.products` and the current Store page.

## Proposed category corrections

| Product | Product ID | Current category | Proposed category | Reason |
|---|---|---|---|---|
| iBUYPOWER Trace Gaming Desktop | `e25d76b6-3120-4118-af99-a46d3b71fcfe` | CPUs | Gaming PCs | Complete desktop system, not an individual CPU |
| ASUS Dual NVIDIA GeForce RTX 5060 Ti 16GB | `1af8f2dd-ab66-4f90-b6a3-6f6f71d797f7` | Gaming | Graphics Cards | Discrete GPU |
| ASUS ROG Strix B850-G motherboard | `177ce979-b88b-4952-a6a4-3025c2294996` | Gaming | Motherboards | Motherboard |
| CORSAIR CLIPPER PRO MINI 60 keyboard | `25f172c2-c6e7-4561-938c-0be300659e11` | Gaming | Keyboards | Gaming keyboard |
| Premium Wireless Bluetooth mouse | `e9831745-0c5b-43b9-8cf9-d9393d25fbbd` | Gaming | Mice | Mouse |
| Thermalright Peerless Assassin 120 SE CPU cooler | `e318afbc-57bf-455a-a88c-e8f966e3b2ad` | Gaming | PC Cooling | CPU cooler |
| ASUS ROG Xbox Ally X Gaming Handheld | `8104c55f-6203-423a-9de9-cbf3496501b8` | Gaming Accessories | Gaming Handhelds | Handheld gaming PC |
| NVIDIA GeForce RTX 5070 12GB graphics card | `29c0a072-b05b-4bab-ad4f-34787de9d739` | Gaming Accessories | Graphics Cards | Discrete GPU |

These are proposals only. Confirm the preferred category names before applying changes. The Store currently derives its category filters from the category values in the product records, so new category names will appear as filters automatically.

## Merchant-link review

Do not replace any live links until the destination and affiliate attribution are verified.

| Product | Current destination type | Review recommendation |
|---|---|---|
| PlayStation 5 DualSense Wireless Controller | Amazon search results | Check for a valid direct product listing; preserve the `veiltactician-20` affiliate tag if switching to an eligible Amazon affiliate URL |
| NVIDIA GeForce RTX 5070 12GB graphics card | Amazon search results | Check whether the current product is an exact match and whether a direct listing is available; preserve affiliate attribution |
| iBUYPOWER Trace Gaming Desktop | Short Amazon link (`amzn.to`) | Resolve and verify the final destination before making any change |
| ASUS ROG Xbox Ally X Gaming Handheld | Long Amazon affiliate URL | Confirm the destination still matches the listed product; do not strip tracking parameters |
| Other Amazon product links | Product or search URL | Spot-check destination, product match, and affiliate tag before editing |
| Dubby Starter Sampler Pack | Dubby referral URL | Preserve the existing referral parameter `ref=yvsynsle` unless the owner explicitly approves a change |

## Safe implementation plan

1. Verify merchant destinations in a browser without purchasing anything.
2. Confirm the category vocabulary and approve the proposed mapping.
3. Apply only approved category updates through the established admin workflow or a separately reviewed database change.
4. Recheck category filters, product links, and product-click analytics on the live Store.
5. Do not delete products, change prices, change affiliate settings, or deploy any additional code as part of this review.

## Not done

- No database rows or policies were changed.
- No merchant links were replaced.
- No purchase or checkout was performed.
- No live-site deployment was triggered by this proposal.
