<template>
    <footer id="contact"
        class="w-full mx-auto bg-[#f6f6f1] px-6 sm:px-10 md:px-16 lg:px-20 py-10 sm:py-14 flex flex-col gap-10">
        <div class="flex flex-col sm:flex-row justify-between">
            <div class="flex flex-col gap-4 max-w-xs">
                <div class="flex items-center gap-2 text-[#1f3d1f] font-semibold text-lg">
                    <i class="fas fa-archway text-lg"></i>
                    <span>CNT Phú Hoà Arena</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-[#1f3d1f]">
                    <i class="far fa-envelope"></i>
                    <span>sanbongdatin@gmail.com</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-[#1f3d1f]">
                    <i class="fas fa-phone-alt"></i>
                    <span>2500-809</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-[#1f3d1f]">
                    <i class="fas fa-phone"></i>
                    <span>0813-1000-7788</span>
                </div>
            </div>
            <form class="mt-8 sm:mt-0 max-w-xs w-full" onsubmit="event.preventDefault()">
                <p class="text-xs text-[#000000cc] mb-3">
                    Stay in the loop with the latest Football news, exclusive offers, and expert tips. Subscribe to our
                    newsletter and never miss a tee time again!
                </p>
                <div class="flex gap-2">
                    <input type="email" placeholder="Enter your mail"
                        class="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f3d1f]"
                        required />
                    <button type="submit"
                        class="bg-[#1f3d1f] text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-[#163116] transition-colors">
                        Submit
                    </button>
                </div>
            </form>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-6 gap-y-6 gap-x-8 text-xs text-[#000000cc]">
            <div>
                <h3 class="font-semibold text-sm mb-2 text-black">Football Courses</h3>
                <ul class="space-y-1">
                    <li>Top-Rated Courses</li>
                    <li>Course Finder</li>
                    <li>Tournaments</li>
                    <li>Featured Courses</li>
                    <li>Course Reviews</li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold text-sm mb-2 text-black">About Us</h3>
                <ul class="space-y-1">
                    <li>Our Story</li>
                    <li>Mission & Vision</li>
                    <li>Leadership Team</li>
                    <li>Careers</li>
                    <li>Media & Press</li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold text-sm mb-2 text-black">Community</h3>
                <ul class="space-y-1">
                    <li>Join Our Forum</li>
                    <li>Member Spotlight</li>
                    <li>Events & Meetups</li>
                    <li>Football Gear Exchange</li>
                    <li>Success Stories</li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold text-sm mb-2 text-black">Connect</h3>
                <ul class="space-y-1">
                    <li>Instagram</li>
                    <li>X (Twitter)</li>
                    <li>Facebook</li>
                    <li>Youtube</li>
                    <li>LinkedIn</li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold text-sm mb-2 text-black">Resources</h3>
                <ul class="space-y-1">
                    <li>Blog</li>
                    <li>Football Tips & Tricks</li>
                    <li>Beginner's Guide</li>
                    <li>Course Tips</li>
                    <li>Football Etiquette</li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold text-sm mb-2 text-black">Support</h3>
                <ul class="space-y-1">
                    <li>Help Center</li>
                    <li>Contact Support</li>
                    <li>Refund Policy</li>
                    <li>Cancellation Policy</li>
                    <li>Site Map</li>
                </ul>
            </div>
        </div>

        <div class="w-full flex justify-center">
            <h1 class="font-extrabold text-[10rem] leading-none uppercase text-transparent bg-clip-text"
                style="background-image: url('https://placehold.co/1200x200/4caf50/4caf50.png?text=Grass+Texture'); background-size: cover; background-position: center;">
                FOOTBALL
            </h1>
        </div>
    </footer>
    <div class="bg-[#1f3d1f] text-white text-center text-xs py-1 select-none">
        © 2025 Indonesian Directorate General of Immigration
    </div>
</template>