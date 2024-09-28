import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

function copyright_page() {
  return (
    <>
      <MaxWidthWrapper>
        <nav className="h-16 pt-2 flex justify-between items-center">
          <img className="h-14" src="/img/logo.png" alt="" />
          <Link
            href="/"
            className="h-12 px-4 bg-red-600 flex items-center rounded text-white "
          >
            Go back
          </Link>
        </nav>
      </MaxWidthWrapper>
      <div className="bg-slate-200 h-fit py-6 mt-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <MaxWidthWrapper className="px-4 ">
          <div className=" max-w-4xl m-auto ">
            <h1 className="md:text-4xl text-2xl font-medium">
              Copyright Notice
            </h1>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="px-4 ">
        <div className=" max-w-4xl m-auto pb-20">
          <section className="mt-4 ">
            <h4 className="font-semibold">
              &copy; GeoAWARE, 2024–{new Date().getFullYear()}.
            </h4>
            <p>All rights reserved.</p>
          </section>

          <section className="mt-4">
            <p>
              All content, code, design elements, and other materials on this
              website, except where otherwise noted, are the exclusive property
              of DionDEV (owner of GeoAWARE). Unauthorized use, copying,
              reproduction, distribution, modification, or display of any part
              of this website without express written permission from DionDEV is
              strictly prohibited.
            </p>
          </section>

          <section className="mt-4 ">
            <h3 className="font-semibold text-2xl">License</h3>
            <p className="mt-4">
              This website and its content are protected by copyright law. The
              following applies:
            </p>
            <ul>
              <li className="mt-4 ml-5 list-disc">
                No portion of the content may be reproduced, distributed, or
                transmitted in any form or by any means, including photocopying,
                recording, or other electronic or mechanical methods, without
                the prior written permission of DionDEV.
              </li>
              <li className="mt-4 ml-5 list-disc">
                For permissions beyond the scope of this notice, please contact{" "}
                <a
                  className="text-sky-400 hover:border-blue-400 hover:border-b-2 transition-colors"
                  href=" mailto: manahandionell1@gmail.com"
                >
                  manahandionell1@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section className="mt-4 ">
            <h3 className="font-semibold text-2xl">Third-Party APIs</h3>
            <p>
              This website integrates third-party APIs, which are the
              intellectual property of their respective owners. Use of these
              APIs is governed by their respective terms and licenses. GeoAWARE
              claims no ownership over the third-party APIs used on this site.
            </p>
          </section>

          <section className="mt-4">
            <h3 className="font-semibold text-2xl">API Attributions</h3>
            <ul>
              <li className="mt-4 ml-5 list-disc">
                MapTiler — Integrated for the use of markers on the map,
                governed by MapTiler's license, available{" "}
                <a
                  className="text-sky-400 hover:border-blue-400 hover:border-b-2 transition-colors"
                  href="https://www.maptiler.com/copyright/"
                >
                  here
                </a>
                .
              </li>
              <li className="mt-4 ml-5 list-disc">
                OpenStreetMap — Integrated for the use of markers on the map,
                governed by OpenStreetMap's license, available{" "}
                <a
                  className="text-sky-400 hover:border-blue-400 hover:border-b-2 transition-colors"
                  href="https://www.openstreetmap.org/copyright"
                >
                  here
                </a>
                .
              </li>
            </ul>
          </section>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

export default copyright_page;
