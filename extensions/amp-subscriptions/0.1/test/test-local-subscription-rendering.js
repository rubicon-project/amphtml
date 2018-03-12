/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Entitlement} from '../entitlement';
import {LocalSubscriptionPlatformRenderer} from '../local-subscription-platform-renderer';

describes.realWin('local-subscriptions-rendering', {amp: true}, env => {
  let ampdoc;
  let renderer;
  let entitlementsForService1;

  beforeEach(() => {
    ampdoc = env.ampdoc;
    renderer = new LocalSubscriptionPlatformRenderer(ampdoc);
    const serviceIds = ['service1', 'service2'];
    const currentProduct = 'currentProductId';
    const sampleEntitlement1 =
      new Entitlement(serviceIds[0], ['currentProductId'], '');
    entitlementsForService1 = new Entitlement(
        serviceIds[0], '', [sampleEntitlement1], currentProduct);
  });

  describe('render method', () => {
    it('should call renderActions_ and renderDialog with '
        + 'the entitlements provided', () => {
      const actionRenderStub = sandbox.stub(renderer, 'renderActions_');
      const dialogRenderStub = sandbox.stub(renderer.dialogRenderer_, 'render');
      renderer.render(entitlementsForService1);
      expect(actionRenderStub).to.be.calledWith(entitlementsForService1);
      expect(dialogRenderStub).to.be.calledWith(entitlementsForService1);
    });
  });
});
